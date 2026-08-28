import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (capitalized)
export class PDP {
    //page
    readonly page: Page;

    //Scope: main product block (the .grid that wraps the <h1>), excludes the
    //"Avis clients" / "Produits similaires" <section>s which reuse the same
    //markup (images, prices, ratings, h3). Anchoring product-info locators here
    //removes most collisions (e.g. img.object-cover appears 4x on the page).
    readonly productPanel: Locator;

    //Elements page PDP - product info (scenario 1-2)
    readonly image: Locator;
    readonly productCategory: Locator;
    readonly productTitle: Locator;
    readonly productReviews: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;
    readonly productFeatures: Locator;
    readonly productStock: Locator;
    readonly addToCartButton: Locator;
    readonly whishListButton: Locator;
    readonly shareProductButton: Locator;

    //Elements page PDP - reassurance block
    readonly productServices: Locator;

    //Elements page PDP - sections (scenario 1-1)
    readonly reviewsSection: Locator;
    readonly similarProductsSection: Locator;

    //Collections used for content assertions
    readonly featureItems: Locator;        // <li> under the "Caractéristiques" list
    readonly reviewItems: Locator;         // review cards inside the "Avis clients" section
    readonly similarProductCards: Locator; // product cards inside "Produits similaires"

    //Navigation
    readonly backToCatalogLink: Locator;


    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Scope on the product block (the .grid inside <main> that contains the h1)
        this.productPanel = page.locator('main').locator('div.grid').filter({ has: page.getByRole('heading', { level: 1 }) });

        //Elements page PDP - product info
        this.image = this.productPanel.getByRole('img').first();
        this.productCategory = this.productPanel.locator('p.text-primary.uppercase');
        this.productTitle = page.getByRole('heading', { level: 1 });
        this.productReviews = this.productPanel.getByText(/\(\d[\d\s]*avis\)/);
        this.productPrice = this.productPanel.locator('span.text-4xl.font-bold');
        this.productDescription = this.productPanel.locator('p.text-muted-foreground.mb-8');
        this.productFeatures = page.getByRole('heading', { name: 'Caractéristiques' });
        this.productStock = this.productPanel.getByText(/en stock|rupture de stock|stock limité|bient[oô]t disponible/i);
        this.addToCartButton = page.getByTestId('product-detail-add-to-cart');
        this.whishListButton = page.getByTestId('product-detail-wishlist-button');
        this.shareProductButton = page.getByTestId('product-detail-share-button');

        //Reassurance block (Livraison gratuite / Garantie 2 ans / Retour 30 jours)
        this.productServices = this.productPanel.getByText('Livraison gratuite');

        //Sections
        this.reviewsSection = page.getByRole('heading', { name: 'Avis clients', level: 2 });
        this.similarProductsSection = page.getByRole('heading', { name: 'Produits similaires', level: 2 });

        //Collections
        this.featureItems = this.productFeatures.locator('xpath=following-sibling::ul').getByRole('listitem');
        this.reviewItems = page.locator('div.p-6.rounded-2xl.bg-card');
        //On a PDP the only product-card-* test ids are the "Produits similaires" cards
        //(the main product uses product-detail-* test ids).
        this.similarProductCards = page.locator('[data-testid^="product-card-"]');

        //Navigation - data-testid is exposed by the app on the back link
        this.backToCatalogLink = page.getByTestId('product-detail-back-link');

    }

    //methods

    //Product info elements checked in scenario 1-2 (image, categorie, nom, avis,
    //prix, description, caracteristique, stock statut, cta, favori, partager)
    getProductInfoElements () {
    return [
        this.image,
        this.productCategory,
        this.productTitle,
        this.productReviews,
        this.productPrice,
        this.productDescription,
        this.productFeatures,
        this.productStock,
        this.addToCartButton,
        this.whishListButton,
        this.shareProductButton,
    ];
}

    //Section elements checked in scenario 1-1 (Avis clients, Produits similaires)
    getSectionElements () {
    return [
        this.reviewsSection,
        this.similarProductsSection,
    ];
}

    //Retrieve all elements to verify their display and ensure that the PDP is displayed without errors in the test file
    getAllElements () {
    return [
        ...this.getProductInfoElements(),
        this.productServices,
        ...this.getSectionElements(),
    ];
}

}
