import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object (uppercase)and the elements 
export class Home {
    //page
    readonly home: Page;
    //Sections and header and footer
    readonly firstSection: Locator;
    readonly explorezNosCategoriesSection: Locator;
    readonly produitsPharesSection: Locator;
    readonly pourquoiSection: Locator;
    readonly avisSection: Locator;
    readonly pretAEquiperVotreQuotidienSection: Locator;
    

    //Links in the page
    readonly decouvrirLesProduits: Locator;
    readonly enSavoirPlus: Locator;
    readonly accessoires: Locator;
    readonly maisonConnectee: Locator;
    readonly gaming: Locator;
    readonly bureau: Locator;
    readonly voirTout: Locator;
    //readonly product: Locator;
    readonly voirleCatalogue: Locator;
  



    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.home = page;
        //Sections and header and footer
        this.firstSection = page.getByRole('heading', { name: 'Produits phares' });
        this.explorezNosCategoriesSection = page.getByRole('heading', { name: 'Explorez nos catégories' });
        this.produitsPharesSection = page.getByRole('heading', { name: 'Produits phares' });
        this.pourquoiSection = page.getByRole('heading', { name: 'Pourquoi choisir TechHub ?' });
        this.avisSection = page.getByRole('heading', { name: 'Ce que disent nos clients' });
        this.pretAEquiperVotreQuotidienSection = page.getByRole('heading', { name: 'Prêt à équiper votre' });
       
        //Links in the page
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

    //methods
    // Retrieve all sections to verify their display in the test file
    getAllSections () {
    return [
        this.firstSection,
        this.explorezNosCategoriesSection,
        this.produitsPharesSection,
        this.pourquoiSection,
        this.avisSection,
        this.pretAEquiperVotreQuotidienSection,
    ]   ;
}

    //Verify that the link works – the URL is to be specified in the test file
    async clicOnLinkAndCheckItIsFunctional(link: Locator, expectedURL: RegExp) {
    //Click on the link
    await link.click();  
    //We verify the correct redirection
    await expect (this.home).toHaveURL(expectedURL);
    }

   }