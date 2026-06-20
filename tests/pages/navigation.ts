import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Navigation {
    //page
    readonly page: Page;
   
    
    //Elements page PLP footer
    readonly footerTechHub: Locator;
    readonly footerProduits: Locator;
    readonly footerEntreprise: Locator;
    readonly footerSupport: Locator;
    readonly footerLegal: Locator;


    //Elements page PLP Header
    readonly headerAccueil: Locator;
    readonly headerProduits: Locator;
    readonly headerApropos: Locator;
    readonly headerContact: Locator;
    readonly headerSearch: Locator;
    readonly headerCart: Locator;
    readonly headerLogin: Locator;
    //Affiché si utilisateur authentifié:
    readonly monCompte: Locator;


    
    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page PLP Footer
        this.footerTechHub = page.getByRole('contentinfo').getByRole('link', { name: 'TechHub', exact: true });
        this.footerProduits = page.getByRole('heading', { name: 'Produits', exact: true });
        this.footerEntreprise = page.getByRole('heading', { name: 'Entreprise' });
        this.footerSupport = page.getByRole('heading', { name: 'Support' });
        this.footerLegal = page.getByRole('heading', { name: 'Légal' });

        //Elements page PLP Header
        this.headerAccueil = page.getByTestId('nav-link-home');
        this.headerProduits = page.getByTestId('nav-link-products');
        this.headerApropos = page.getByTestId('nav-link-about');
        this.headerContact = page.getByTestId('nav-link-contact');
        this.headerSearch = page.getByTestId('search-button');
        this.headerCart = page.getByTestId('cart-button');
        this.headerLogin = page.getByTestId('login-button');
        //Affiché si utilisateur authentifié:
        this.monCompte = page.getByTestId('account-link');


    }

    //méthodes
    // Récupérer toutes les élémets pour en vérifier l'affichage et que la PLP s'affiche sans erreur dans le fichier de test
    getTousLesEléments () {
    return [
        this.footerTechHub,
        this.footerProduits,
        this.footerEntreprise,
        this.footerLegal,
        this.footerProduits,
        this.footerSupport,
        this.headerAccueil,
        this.headerApropos,
        this.headerProduits,
        this.headerContact,
        this.headerSearch,
        this.headerCart,
        this.headerLogin,
    ]   ;
}

//Vérifier que le lien est fonctionnel - l'URL sera à spécifier dans le fichier de test
    async cliquersurLienetVérifierFonctionnel(lien: Locator, urlAttendue: RegExp) {
    //on clic sur le lien
    await lien.click();  
    //on vérifie la bonne redirection
    await expect (this.page).toHaveURL(urlAttendue);
    }

//L'utilisateur authentifié accède à son compte après avoir été redirigé sur la page d'acceuil
    async cliquerSurMonCompte() {
    //on clic sur l'îcone de login dans le header
    await this.headerLogin.click();
    //on clic sur mon compte
    await this.monCompte.click();  
        
    }

//L'utilisateur non authentifié accède veut s'authentifier
    async cliquerSurLogin() {
    //on clic sur l'îcone de login dans le header
    await this.headerLogin.click();        
    }

}