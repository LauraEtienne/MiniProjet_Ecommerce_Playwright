import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Acceuil {
    //page
    readonly page: Page;
    //Sections et header et footer
    readonly sectionPremiere: Locator;
    readonly sectionExplorezNosCategories: Locator;
    readonly sectionProduitsPhares: Locator;
    readonly sectionPourquoi: Locator;
    readonly sectionAvis: Locator;
    readonly sectionPretAEquiperVotreQuotidien: Locator;
    readonly footerTechHub: Locator;
    readonly footerProduits: Locator;
    readonly footerEntreprise: Locator;
    readonly footerSupport: Locator;
    readonly footerLegal: Locator;
    readonly headerAccueil: Locator;
    readonly headerProduits: Locator;
    readonly headerApropos: Locator;
    readonly headerContact: Locator;
    readonly headerSearch: Locator;
    readonly headerCart: Locator;
    readonly headerLogin: Locator;

    //Liens dans la page
    readonly decouvrirLesProduits: Locator;
    readonly enSavoirPlus: Locator;
    readonly accessoires: Locator;
    readonly maisonConnectee: Locator;
    readonly gaming: Locator;
    readonly bureau: Locator;
    readonly voirTout: Locator;
    //readonly produit: Locator;
    readonly voirleCatalogue: Locator;
  



    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;
        //Sections et header et footer
        this.sectionPremiere = page.getByRole('heading', { name: 'Produits phares' });
        this.sectionExplorezNosCategories = page.getByRole('heading', { name: 'Explorez nos catégories' });
        this.sectionProduitsPhares = page.getByRole('heading', { name: 'Produits phares' });
        this.sectionPourquoi = page.getByRole('heading', { name: 'Pourquoi choisir TechHub ?' });
        this.sectionAvis = page.getByRole('heading', { name: 'Ce que disent nos clients' });
        this.sectionPretAEquiperVotreQuotidien = page.getByRole('heading', { name: 'Prêt à équiper votre' });
        this.footerTechHub = page.getByRole('contentinfo').getByRole('link', { name: 'TechHub', exact: true });
        this.footerProduits = page.getByRole('heading', { name: 'Produits', exact: true });
        this.footerEntreprise = page.getByRole('heading', { name: 'Entreprise' });
        this.footerSupport = page.getByRole('heading', { name: 'Support' });
        this.footerLegal = page.getByRole('heading', { name: 'Légal' });
        this.headerAccueil = page.getByTestId('nav-link-home');
        this.headerProduits = page.getByTestId('nav-link-products');
        this.headerApropos = page.getByTestId('nav-link-about');
        this.headerContact = page.getByTestId('nav-link-contact');
        this.headerSearch = page.getByTestId('search-button');
        this.headerCart = page.getByTestId('cart-button');
        this.headerLogin = page.getByTestId('login-button');


        //Liens dans la page
        this.decouvrirLesProduits = page.getByTestId('hero-cta-button');
        this.enSavoirPlus = page.getByTestId('hero-about-button');
        this.accessoires = page.getByTestId('category-link-accessories');
        this.maisonConnectee = page.getByTestId('category-link-smart-home');
        this.gaming = page.getByTestId('category-link-gaming');
        this.bureau = page.getByTestId('category-link-office');
        this.voirTout = page.getByTestId('view-all-products-button');
        //this.produit = page.getByTestId('product-card-1');   =>   // Eventuellement, créer une méthode qui génère le locator dynamiquement
        this.voirleCatalogue = page.getByTestId('cta-catalog-button');


    }

    //méthodes
    // Récupérer toutes les sections pour en vérifier l'affichage dans le fichier de test
    getToutesLesSections () {
    return [
        this.sectionPremiere,
        this.sectionExplorezNosCategories,
        this.sectionProduitsPhares,
        this.sectionPourquoi,
        this.sectionAvis,
        this.sectionPretAEquiperVotreQuotidien,
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

   }