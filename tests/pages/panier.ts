import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Panier {
    //page
    readonly page: Page;

    readonly titrePage: Locator;
    readonly btnViderLePanier: Locator;
    readonly btnPasserAuPaiement: Locator;
    readonly btnContinuerMesAchats: Locator;
    readonly compteurProduits: Locator;


    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;
        this.titrePage = page.getByRole('heading', { name: 'Votre Panier' });
        this.btnViderLePanier = page.getByTestId('clear-cart-button');
        this.btnPasserAuPaiement = page.getByTestId('checkout-button');
        this.btnContinuerMesAchats = page.getByTestId('continue-shopping-button');
        this.compteurProduits = page.getByTestId('cart-count');
  
    }

    //méthodes
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