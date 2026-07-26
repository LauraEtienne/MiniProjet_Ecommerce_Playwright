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
    readonly deconnexion: Locator;
    readonly userMenu: Locator; //  On le déclare ici


    
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
        this.headerLogin = page.getByTestId('login-button'); // Pour l'état Déconnecté
        //Affiché si utilisateur authentifié:
        this.monCompte = page.getByTestId('account-link'); // Le lien à l'intérieur du menu
        this.deconnexion = page.getByTestId('logout-button');
        this.userMenu = page.getByTestId('user-menu-button');


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
    async cliquerSurMonCompte(){   
    // 1. On attend qu'il soit bien visible à l'écran après l'inscription
    await this.userMenu.waitFor({ state: 'visible' });
    // 2. On clique sur l'icône de profil pour ouvrir le menu déroulant
    await this.userMenu.click();
    // 3. On clique sur le lien "Mon compte" à l'intérieur du menu
    await this.monCompte.click();
        
    }

//L'utilisateur non authentifié veut s'authentifier
    async cliquerSurLogin() {
    //on clic sur l'îcone de login dans le header
    await this.headerLogin.click();        
    }


//L'utilisateur veut se deconnecter
    async seDeconnecterAPartirDuHeader() {
    //on clic sur l'îcone de login dans le header
    await this.headerLogin.click();
    //on clic sur mon compte
    await this.deconnexion.click();  
        
    }

   }