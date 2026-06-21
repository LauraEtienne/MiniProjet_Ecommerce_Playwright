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

    // Page3
    readonly titreConfirmation: Locator;
    readonly messageSucces: Locator;
    readonly confirmationCard: Locator;
    readonly btnSuivreMaCommande: Locator;
    readonly btnContinuerMesAchats: Locator;



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
        this.editionNumeroCarte = page.;
        this.editionNomCarte = page.getByTestId('clear-cart-button');
        this.editionDateExpiration = page.getByTestId('checkout-button');
        this.editionCVV = page.getByTestId('continue-shopping-button');
        this.btnSoumettrePaiment = page.getByTestId('payment-submit-button');
        // Page3
        this.titreConfirmation = page.getByRole('heading', { name: 'Commande confirmée !' });
        this.messageSucces = page.getByText('Merci pour votre commande.');
        this.confirmationCard = page.getByTestId('order-confirmation-card');
        this.btnSuivreMaCommande = page.getByTestId('track-order-button');
        this.btnContinuerMesAchats = page.getByTestId('continue-shopping-button');

    }

    //méthodes TODO
    // Augmenter quantité produit
    async augmenterQteProduit (idProduit: string) {
        await this.page.getByTestId('increase-quantity-${idProduit}')
}

    // Diminuer quantité produit
    async diminuerQteProduit (idProduit: string) {
        await this.page.getByTestId('decrease-quantity-${idProduit}');
    
}

    // Supprimer produit
    async supprimerProduit (idProduit: string) {
        await this.page.getByTestId('remove-item-${idProduit}')
    
}

    // Vider le panier
    async viderLePanier () {
        await this.btnViderLePanier.click();
    
}
    // Passer au paiement
    async passerAuPaiement () {
        await this.btnPasserAuPaiement.click();
    
}

    // Continuer mes achats
    async continuerMesAchats () {
        await this.btnContinuerMesAchats.click();
    
}

}