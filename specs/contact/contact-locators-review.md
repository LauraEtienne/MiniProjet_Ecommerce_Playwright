# Contact — revue des locators avant génération de `contact.spec.ts`

Analyse de `tests/pages/contact.ts` (POM) confrontée au DOM réel de
`https://shop.missionplaywright.fr/contact` (inspecté le 2026-08-30).

Objectif : valider avec toi les corrections à apporter au POM **avant** que je
génère `tests/e2e/contact/contact.spec.ts`.

Scénarios visés (issus de `specs/scenarios_playwright_claude.xlsx`) :

| Id | describe     | test                                               |
| -- | ------------ | -------------------------------------------------- |
| 9  | Contact Page | should display contact page elements properly      |
| 10 | Contact Page | should send message successfully with valid inputs |
| 11 | FAQ Section  | should expand and collapse FAQ items correctly     |

---

## 0. Constat général

La page Contact **n'expose aucun `data-testid`** (contrairement au header, qui a
`nav-link-contact`, etc.). Les sélecteurs par rôle / label / texte sont donc ici
l'approche correcte — inutile de viser des testid inexistants. Les points
ci-dessous concernent surtout des **chaînes de texte trop fragiles** (tronquées,
concaténées, données en dur) et **deux bugs** dans le POM.

Légende :

- 🔴 **Bug** — le test échouera ou testera la mauvaise chose.
- 🟠 **Fragile** — fonctionne aujourd'hui mais casse au moindre changement de wording.
- 🟢 **OK** — robuste, à garder tel quel.

---

## 1. 🔴 Bug bloquant — `sendMessage()` remplit 4× le même champ

`tests/pages/contact.ts` lignes 83-90 :

```ts
async sendMessage(fullName: string, email: string, subject: string, message: string) {
    await this.fullNameTextbox.fill(fullName);
    await this.fullNameTextbox.fill(email);      // ❌ devrait être emailTextbox
    await this.fullNameTextbox.fill(subject);    // ❌ devrait être subjectTextbox
    await this.fullNameTextbox.fill(message);    // ❌ devrait être messageTextbox
    await this.sendMessageButton.click();
}
```

Les 4 valeurs sont écrites dans « Nom complet », les autres champs restent vides.
Comme les 4 champs sont `required` (voir §2), la soumission du scénario 10
échouerait.

**Correction proposée :**

```ts
async sendMessage(fullName: string, email: string, subject: string, message: string) {
    await this.fullNameTextbox.fill(fullName);
    await this.emailTextbox.fill(email);
    await this.subjectTextbox.fill(subject);
    await this.messageTextbox.fill(message);
    await this.sendMessageButton.click();
}
```

---

## 2. Formulaire « Envoyez-nous un message »

DOM réel :

```html
<form class="space-y-4">
  <label for="name">Nom complet</label>   <input id="name"   name="name"    type="text"  required>
  <label for="email">Email</label>         <input id="email"  name="email"   type="email" required>
  <label for="subject">Sujet</label>       <input id="subject" name="subject" type="text"  required>
  <label for="message">Message</label>     <textarea id="message" name="message" required></textarea>
  <button type="submit">Envoyer le message</button>
</form>
```

| POM                   | Locator actuel                                          | Verdict | Commentaire                                                            |
| --------------------- | ------------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| `fullNameTextbox`   | `getByRole('textbox', { name: 'Nom complet' })`       | 🟢 OK   | Label correctement associé (`for="name"`).                          |
| `emailTextbox`      | `getByRole('textbox', { name: 'Email' })`             | 🟢 OK   | `type="email"` reste `role=textbox`. Nom accessible = « Email ». |
| `subjectTextbox`    | `getByRole('textbox', { name: 'Sujet' })`             | 🟢 OK   |                                                                        |
| `messageTextbox`    | `getByRole('textbox', { name: 'Message' })`           | 🟢 OK   | `<textarea>` = `role=textbox`.                                     |
| `sendMessageButton` | `getByRole('button', { name: 'Envoyer le message' })` | 🟢 OK   |                                                                        |

**Aucun changement requis ici.** (Alternative équivalente et un peu plus stable :
`page.getByLabel('Nom complet')`, etc. — à toi de voir si tu veux homogénéiser.)

### Résultat attendu du scénario 10

Après soumission avec des données valides, un **toast** apparaît (région
`role="region"` « Notifications », composant Radix, identique à celui décrit dans
`specs/authentication/authentication-error.md`) contenant exactement :

> **Message envoyé ! Nous vous répondrons sous 24h.**

Le formulaire est ensuite réinitialisé (champs vidés).

Assertion envisagée dans le test (pas dans le POM) :

```ts
await expect(page.getByText('Message envoyé')).toBeVisible();
```

Le POM n'a pas de locator pour ce toast — **à ajouter** si tu veux le garder côté
POM :

```ts
readonly messageSentToast: Locator;
// ...
this.messageSentToast = page.getByText('Message envoyé ! Nous vous répondrons sous 24h.');
```

---

## 3. Section « Informations »

DOM réel :

```html
<a href="mailto:contact@techhub.fr"><p>Email</p><p>contact@techhub.fr</p></a>
<a href="tel:+33123456789"><p>Téléphone</p><p>01 23 45 67 89</p></a>
<div><p>Adresse</p><p>123 Avenue Tech, 75001 Paris</p></div>
<div><p>Support client</p><p>Lun-Ven : 9h-18h</p></div>
```

| POM               | Locator actuel                                              | Verdict    | Problème                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `emailLink`     | `getByRole('link', { name: 'Email contact@techhub.fr' })` | 🟠 Fragile | Nom accessible = concaténation des 2`<p>` + **adresse e-mail en dur**. Casse si le libellé ou l'e-mail change.                                                                |
| `phoneLink`     | `getByRole('link', { name: 'Téléphone 01 23 45 67' })`  | 🟠 Fragile | Numéro**en dur et tronqué** (`…67`, il manque `89`). Marche par match partiel aujourd'hui.                                                                                 |
| `address`       | `getByText('Adresse')`                                    | 🟠 Fragile | Match texte nu, non typé. OK car « Adresse » n'apparaît qu'une fois.                                                                                                                |
| `supportClient` | `getByText('Support Client')`                             | 🟠 Fragile | Le DOM affiche « Support**c**lient » (minuscule). Ça passe uniquement parce que `getByText` est **insensible à la casse** par défaut. À aligner sur le texte réel. |

**Corrections proposées** — cibler l'attribut `href` (stable) plutôt que le texte
concaténé :

```ts
this.emailLink   = page.getByRole('link', { name: /contact@techhub\.fr/ });
// ou, plus robuste encore :
this.emailLink   = page.locator('a[href^="mailto:"]');
this.phoneLink   = page.locator('a[href^="tel:"]');

// Sections info : cibler le libellé exact et le typer en heading/paragraph
this.address       = page.getByText('Adresse', { exact: true });
this.supportClient = page.getByText('Support client', { exact: true }); // casse corrigée
```

je ne comprends pas ce que l'on cible est-ce qu'on récupère le contenu de email  telephone...?

> Si tu préfères éviter les regex, garde `getByRole('link', { name: 'contact@techhub.fr' })`
> (sans le préfixe « Email »), qui reste lisible et ne dépend plus de la concaténation.

### Vérifier que « les liens sont fonctionnels » (scénario 9)

Les liens `mailto:` / `tel:` ne provoquent pas de navigation dans le navigateur.
La vérification réaliste = **asserter l'attribut `href`** :

```ts
await expect(contactPage.emailLink).toHaveAttribute('href', 'mailto:contact@techhub.fr');
await expect(contactPage.phoneLink).toHaveAttribute('href', 'tel:+33123456789');
```

À confirmer avec toi : c'est bien cette interprétation de « liens fonctionnels »
qu'on retient ?   oui et c est ce que j avais mis en commentaire dans mon fichier contact.ts 

```typescript
//    clickerEmailContact => to be done in the test file; no method needed here?
    //    clickerTéléphoneContact => to be done in the test file; no method needed here?
```

---

## 4. Section « Questions fréquentes » (FAQ)

DOM réel — accordéon. Chaque question est un `<button>` ; la réponse est un
`<p>` **ajouté / retiré du DOM** à l'ouverture / fermeture (vérifié : le
paragraphe disparaît complètement au repli).

Libellés réels des boutons :

- « Quels sont les délais de livraison ? »
- « Comment retourner un produit ? »
- « Les produits sont-ils garantis ? »
- « Quels modes de paiement acceptez-vous ? »

Réponse réelle du 1er item :

> « La livraison standard prend 2-4 jours ouvrés. La livraison express est
> disponible en 24h pour les commandes passées avant 14h. »

| POM                       | Locator actuel                                                      | Verdict    | Problème                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `delayQuestion`         | `getByRole('button', { name: 'Quels sont les délais de' })`      | 🟠 Fragile | Chaîne**tronquée** (« …délais de »). Match partiel.                                                                               |
| `delayAnswer`           | `getByText('La livraison standard prend 2')`                      | 🟠 Fragile | Chaîne tronquée.                                                                                                                            |
| `productReturnQuestion` | `getByRole('button', { name: 'Comment retourner un produit ?' })` | 🟢 OK      | Libellé complet et exact.                                                                                                                    |
| `productReturnAnswer`   | `getByText('Vous disposez de 30 jours')`                          | 🟠 Fragile | Tronqué —**à revérifier**, je n'ai ouvert que le 1er item ; le texte exact des réponses 2/3/4 est à confirmer à la génération. |
| `warrantyQuestion`      | `getByRole('button', { name: 'Les produits sont-ils' })`          | 🟠 Fragile | Tronqué.                                                                                                                                     |
| `warrantyAnswer`        | `getByText('Tous nos produits bénéficient')`                    | 🟠 Fragile | Tronqué + à confirmer.                                                                                                                      |
| `paymentQuestion`       | `getByRole('button', { name: 'Quels modes de paiement' })`        | 🟠 Fragile | Tronqué.                                                                                                                                     |
| `paymentAnswer`         | `getByText('Nous acceptons les cartes')`                          | 🟠 Fragile | Tronqué + à confirmer.                                                                                                                      |

**Corrections proposées** — utiliser les libellés **complets** des boutons
(courts et stables), et pour les réponses accepter le match partiel `getByText`
mais sur un fragment volontairement choisi (pas une troncature accidentelle) : on modifie avec libelles entier

```ts
this.delayQuestion   = page.getByRole('button', { name: 'Quels sont les délais de livraison ?' });
this.warrantyQuestion = page.getByRole('button', { name: 'Les produits sont-ils garantis ?' });
this.paymentQuestion = page.getByRole('button', { name: 'Quels modes de paiement acceptez-vous ?' });
```

### 🔴 Bug — les méthodes `viewXxxFAQ()` ne permettent pas de tester le repli

Les méthodes `viewDelayFAQ()` / `viewProductReturnFAQ()` / … font seulement un
`.click()` pour **ouvrir**, puis renvoient le locator de réponse. Le scénario 11
demande « **expand and collapse** ». Il faut soit :

- ajouter une méthode `toggle` réutilisable :

```ts
async toggleFAQ(question: Locator) {
    await question.click();
}
```

  et gérer les assertions `toBeVisible()` / `toBeHidden()` dans le test, soit

- garder les `viewXxx` pour l'ouverture et cliquer une 2ᵉ fois sur la question
  dans le test pour le repli, en assertant `await expect(answer).toBeHidden()`
  (le `<p>` est retiré du DOM → `toBeHidden()` est vrai).

À trancher avec toi : on enrichit le POM (méthode `toggleFAQ`) ou on gère
l'ouverture/fermeture uniquement dans le `.spec.ts` ? on enrichit le POM

---

## 5. Titres de sections (scénario 9 — « contenu attendu »)

| POM                    | Locator                                                       | Verdict          |
| ---------------------- | ------------------------------------------------------------- | ---------------- |
| `pageTitle`          | `getByRole('heading', { name: 'Nous Contacter' })`          | 🟢 OK (`<h1>`) |
| `sendMessageSection` | `getByRole('heading', { name: 'Envoyez-nous un message' })` | 🟢 OK (`<h2>`) |
| `informationSection` | `getByRole('heading', { name: 'Informations' })`            | 🟢 OK (`<h2>`) |
| `questionsSection`   | `getByRole('heading', { name: 'Questions fréquentes' })`   | 🟢 OK (`<h2>`) |

`getAllSectionsandInfo()` (utilisée pour la vérif d'affichage du scénario 9)
renvoie ces 4 headings + `address` + `supportClient`. Une fois le §3 corrigé,
la méthode est utilisable telle quelle.

---

## 6. Récapitulatif des changements à valider

| # | Fichier                                      | Nature                                                                                          | Priorité             | Mon retour                               |
| - | -------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------- |
| 1 | `contact.ts` `sendMessage()`             | 🔴 Corriger les 3`fill` vers `email/subject/message`                                        | Bloquant scénario 10 | j ai corrige                             |
| 2 | `contact.ts` FAQ                           | 🔴 Ajouter`toggleFAQ()` **ou** gérer le collapse dans le spec                          | Bloquant scénario 11 | ajouter toggle                           |
| 3 | `contact.ts` `emailLink` / `phoneLink` | 🟠 Cibler`href` au lieu du nom concaténé + numéro en dur                                   | Recommandé           | cibler href + voir ma question plus haut |
| 4 | `contact.ts` `supportClient`             | 🟠 Corriger la casse → « Support client » (+`exact: true`)                                 | Recommandé           | a corriger                               |
| 5 | `contact.ts` questions FAQ                 | 🟠 Libellés complets au lieu des chaînes tronquées                                           | Recommandé           | a corriger                               |
| 6 | `contact.ts` réponses FAQ                 | 🟠 Fragments volontaires ;**revérifier le texte exact des items 2-4** à la génération | Recommandé           | a corriger                               |
| 7 | `contact.ts`                               | 🟢 (option) Ajouter`messageSentToast` pour le résultat attendu du scénario 10               | Optionnel             | j ai corrige                             |

### Hors périmètre mais repéré

- `tests/setup/seed.spec.ts` importait `./fixture` au lieu de `../fixture` — le
  setup Playwright MCP plantait. Corrigé (1 caractère) pour pouvoir inspecter la
  page. À garder / relire de ton côté.

---

## 7. Prochaine étape

En attente de ta relecture. Dis-moi lesquels des points 1-7 tu valides (et pour
les points 2 « toggle POM vs spec » et §3 « liens fonctionnels = assert href ? »
ton choix), puis je génère `tests/e2e/contact/contact.spec.ts` avec 3 `test`
regroupés en 2 `test.describe` (`Contact Page`, `FAQ Section`), sur le modèle de
`tests/e2e/plp/plp.spec.ts`.
