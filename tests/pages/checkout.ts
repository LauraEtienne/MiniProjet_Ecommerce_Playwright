import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Checkout {
    //page
    readonly page: Page;
    // Page1
    readonly titreLivraison: Locator;
    readonly editionPrenom: Locator;
    readonly editionNom: Locator;
    readonly editionEmail: Locator;
    readonly editionTelephone: Locator;
    readonly editionAdresse: Locator;
    readonly editionVille: Locator;
    readonly editionCodePostal: Locator;
    readonly btnContinuerVersPaiment: Locator;

    // Page2
    readonly titrePaiement: Locator;
    readonly editionNumeroCarte: Locator;
    readonly editionNomCarte: Locator;
    readonly editionDateExpiration: Locator;
    readonly editionCVV: Locator;
    readonly btnSoumettrePaiment: Locator;
    readonly totalAmountLabel: Locator;

    // Page3
    readonly titreConfirmation: Locator;
    readonly messageSucces: Locator;
    readonly confirmationCard: Locator;
    readonly btnSuivreMaCommande: Locator;
    readonly btnContinuerMesAchats: Locator;
    readonly numeroCommande: Locator;



    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        // Page1
        this.page = page;
        this.titreLivraison = page.getByRole('heading', { name: 'Adresse de livraison' });
        this.editionPrenom = page.getByTestId('shipping-firstname-input');
        this.editionNom = page.getByTestId('shipping-lastname-input');
        this.editionEmail = page.getByTestId('shipping-email-input');
        this.editionTelephone = page.getByTestId('shipping-phone-input');
        this.editionAdresse = page.getByTestId('shipping-address-input');
        this.editionVille = page.getByTestId('shipping-city-input');
        this.editionCodePostal = page.getByTestId('shipping-postalcode-input');
        this.btnContinuerVersPaiment = page.getByTestId('shipping-submit-button');
        // Page2
        this.titrePaiement = page.getByTestId('cart-count');
        this.editionNumeroCarte = page.getByTestId('payment-cardnumber-input');
        this.editionNomCarte = page.getByTestId('clear-cart-button');
        this.editionDateExpiration = page.getByTestId('checkout-button');
        this.editionCVV = page.getByTestId('continue-shopping-button');
        this.btnSoumettrePaiment = page.getByTestId('payment-submit-button');
        this.totalAmountLabel = page.locator('span.text-2xl.font-bold');
        // Page3
        this.titreConfirmation = page.getByRole('heading', { name: 'Commande confirmée !' });
        this.messageSucces = page.getByText('Merci pour votre commande.');
        this.confirmationCard = page.getByTestId('order-confirmation-card');
        this.btnSuivreMaCommande = page.getByTestId('track-order-button');
        this.btnContinuerMesAchats = page.getByTestId('continue-shopping-button');
        this.numeroCommande = page.getByTestId('order-number');

    }

    //méthodes TODO
    // Saisir les données de la page Livraison et passer au paiement
    async soumettreDonneesLivraison(prenom: string, nom: string, email: string, telephone: string, adresse: string, ville: string, codepostal: string) {
        await this.editionPrenom.fill(prenom),
        await this.editionNom.fill(nom),
        await this.editionEmail.fill(email),
        await this.editionTelephone.fill(telephone),
        await this.editionAdresse.fill(adresse),
        await this.editionVille.fill(ville),
        await this.editionCodePostal.fill(codepostal),
        await this.btnContinuerVersPaiment.click()
}

    // Saisir les données de la page paiement et cliquer sur le CTA Payer
    async soumettreDonneesPaiement(numCarte: string, nomcarte: string, dateExp: string, CVV: string) {
        await this.editionNumeroCarte.fill(numCarte),
        await this.editionNomCarte.fill(nomcarte),
        await this.editionDateExpiration.fill(dateExp),
        await this.editionCVV.fill(CVV),
        await this.btnSoumettrePaiment.click()

    }

    // Retourner le montant total à payer pour test de vérification
    async retournerMontantAPayer () : Promise<string> {
        const text = await this.totalAmountLabel.textContent();
       //Si text contient bien une chaîne de caractères (vrai), alors remplace les retours à la ligne et les espaces multiples par un seul espace propre
       // Sinon (si text est null ou undefined), alors renvoie une chaîne vide ''.        
       return text ? text.replace(/\s+/g, ' ').trim() : ''; 
       // Résultat propre : "149.99 €"

    }

    // Retourner le numéro de commande
    async retournenmeroCommandxe() : Promise<string>  {
       const text = await this.numeroCommande.textContent();
       //Si text contient bien une chaîne de caractères (vrai), alors remplace les retours à la ligne et les espaces multiples par un seul espace propre
       // Sinon (si text est null ou undefined), alors renvoie une chaîne vide ''.
       return text ? text.replace(/\s+/g, ' ').trim() : ''; 

    }
    // Suivre ma commande
    async suivreCommande():Promise<void> {
        await this.btnSuivreMaCommande.click();

    }

    // Continuer mes achats
    async continuerMesAchats():Promise<void> {
        await this.btnContinuerMesAchats.click();

    }

}