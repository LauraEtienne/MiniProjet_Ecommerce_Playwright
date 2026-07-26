import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Compte {
    //https://shop.missionplaywright.fr/account
    //page
    readonly page: Page;
    //Elements page Compte
    readonly tabProfil: Locator;
    readonly tabCommandes: Locator;
    readonly tabParametres: Locator;
    readonly btnDeconnexion: Locator;
    //Profil
    readonly titreInformationsPersonnelles: Locator;
    readonly champNomComplet: Locator;
    readonly valeurNomComplet: Locator;
    readonly nomCompletEdition: Locator;
    readonly champTelephone: Locator;
    readonly valeurTelephone: Locator;
    readonly telephoneEdition: Locator;
    readonly champVille: Locator;
    readonly valeurVille: Locator;
    readonly villeEdition: Locator;
    readonly champEmail: Locator;
    readonly valeurEmail: Locator;
    readonly champAdresse: Locator;
    readonly valeurAdresse: Locator;
    readonly adresseEdition: Locator;
    readonly champCodePostal: Locator;
    readonly valeurCodePostal: Locator;
    readonly codePostalEdition: Locator;
    readonly btnModifier: Locator;
    readonly btnAnnuler: Locator;
    readonly btnEnregistrer: Locator;
    //Commandes
    readonly titreCommandes: Locator;
    readonly btnDecouvrirProduits: Locator;
    //Paramètres
    readonly titreParametres: Locator;
    readonly statutNotificationsparEmail: Locator;
    readonly statutNewsletter: Locator;
    readonly btnSupprimerCompte: Locator;



    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page Compte
        this.tabProfil = page.getByTestId('account-tab-profile');
        this.tabCommandes = page.getByTestId('account-tab-orders');
        this.tabParametres = page.getByTestId('account-tab-settings');
        this.btnDeconnexion = page.getByTestId('account-logout-button');
        //Profil
        this.titreInformationsPersonnelles = page.getByRole('heading', { name: 'Informations personnelles' });
        this.champNomComplet = page.getByText('Nom complet');
        this.valeurNomComplet = page.locator('div.space-y-2', { hasText: 'Nom complet' }).locator('p.text-foreground');
        this.nomCompletEdition = page.getByTestId('account-fullname-input');
        this.champTelephone = page.getByText('Téléphone');
        this.valeurTelephone = page.locator('div.space-y-2', { hasText: 'Téléphone' }).locator('p.text-foreground');
        this.telephoneEdition = page.getByTestId('account-phone-input');
        this.champVille = page.getByText('Ville');
        this.valeurVille = page.locator('div.space-y-2', { hasText: 'Ville' }).locator('p.text-foreground');
        this.villeEdition = page.getByTestId('account-city-input');
        this.champEmail = page.getByText('Email');
        this.valeurEmail = page.locator('div.space-y-2', { hasText: 'Email' }).locator('p.text-foreground');
        this.champAdresse = page.getByText('Adresse', { exact: true });
        this.valeurAdresse = page.locator('div.space-y-2', { hasText: 'Adresse' }).locator('p.text-foreground');
        this.adresseEdition = page.getByTestId('account-address-input');
        this.champCodePostal = page.getByText('Code postal');
        this.valeurCodePostal = page.locator('div.space-y-2', { hasText: 'Code postal' }).locator('p.text-foreground');
        this.codePostalEdition = page.getByTestId('account-postalcode-input');
        this.btnModifier = page.getByTestId('account-edit-button');
        this.btnAnnuler = page.getByTestId('account-cancel-button');
        this.btnEnregistrer = page.getByTestId('account-save-button');
        //Commandes
        this.titreCommandes = page.getByRole('heading', { name: 'Historique des commandes' });
        this.btnDecouvrirProduits = page.getByTestId('account-browse-products-button');
        //Paramètres  
        this.titreParametres = page.getByRole('heading', { name: 'Paramètres du compte' });
        this.statutNotificationsparEmail = page
        .locator('div.flex', { has: page.locator('h4', { hasText: 'Notifications par email' }) })
        .locator('div.text-foreground');
        this.statutNewsletter = page
        .locator('div.flex', { has: page.locator('h4', { hasText: 'Newsletter' }) })
        .locator('div.text-foreground');
        this.btnSupprimerCompte = page.getByTestId('account-delete-button');
    }

    //méthodes
    // Modifier les données du profil
    async modifierDonneesProfil(nom: string, telephone: string, ville: string, adresse: string, codePostal: string) {
        //cliquer sur modifier
        await this.btnModifier.click();
        //Renseigner les champs éditables
        await this.nomCompletEdition.fill(nom);
        await this.telephoneEdition.fill(telephone);
        await this.villeEdition.fill(ville);
        await this.adresseEdition.fill(adresse);
        await this.codePostalEdition.fill(codePostal);
        //Cliquer sur Enregistrer
        await this.btnEnregistrer.click();
    }


       // Modifier les données du profil // .textContent() extrait le texte de l'élément cible
     async getStatutNotificationsEmail() {
        const texteRaw = await this.statutNotificationsparEmail.textContent();
        return texteRaw ? texteRaw.trim() : '';  //Condition ? Valeur_si_vrai : Valeur_si_faux

    }

    async getStatutNewsLetter() {
        const texteRaw = await this.statutNewsletter.textContent();
        return texteRaw ? texteRaw.trim() : '';  //Condition ? Valeur_si_vrai : Valeur_si_faux

    }


    // Supprimer compte et Déconnexion ne nécessitent pas de méthodes

}