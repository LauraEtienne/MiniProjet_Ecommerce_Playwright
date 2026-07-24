import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (capitalized)
export class PDP {
    //page
    readonly page: Page;
    //Elements page PDP
    readonly productTitle: Locator;
    readonly productCategory: Locator;
    readonly productReviews: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;
    readonly productFeatures: Locator;
    readonly productStock: Locator;
    readonly addToCartButton: Locator;
    readonly whishListButton: Locator;
    readonly shareProductButton: Locator;
    readonly productServices: Locator;
    readonly reviewsSection: Locator;
    readonly similarProductsSection: Locator;
    readonly image: Locator;
    readonly backToCatalogLink: Locator;

    
    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page PDP
        this.productTitle = page.locator('h1');
        this.productCategory = page.locator('p.text-primary.uppercase'); //balise.class.class 
        this.productReviews = page.locator('div.flex.items-center.gap-3.mb-6').filter({ hasText: 'avis' });
        this.productPrice = page.locator('div.flex.items-baseline.gap-4.mb-6').locator('span.text-4xl.font-bold');
        this.productDescription = page.locator('text-muted-foreground.mb-8');
        this.productFeatures = page.getByRole('heading', {name : 'Caractéristiques'});
        this.productStock = page.locator('p.text-sm.font-medium.flex.items-center.gap-2.text-primary').filter({ hasText: 'stock'});
        this.addToCartButton = page.getByTestId('product-detail-add-to-cart');
        this.whishListButton = page.getByTestId('product-detail-wishlist-button');
        this.shareProductButton = page.getByTestId('product-detail-share-button');
        this.productServices = page.locator('div.grid.grid-cols-3.gap-4.p-4.bg-muted/50.rounded-2xl');
        this.reviewsSection = page.getByRole('heading', {name:'Avis clients' });
        this.similarProductsSection = page.getByRole('heading', {name: 'Produits similaires'});
        this.image = page.locator('img.object-cover'); // generaliser
        this.backToCatalogLink = page.getByRole('link', {name: 'Retour au catalogue'});

    }

    //methods
    //Retrieve all elements to verify their display and ensure that the PLP is displayed without errors in the test file
    getAllElements () {
    return [
        this.productTitle,
        this.productCategory,
        this.productReviews,
        this.productPrice,
        this.productDescription,
        this.productFeatures,
        this.productStock,
        this.addToCartButton,
        this.whishListButton,
        this.shareProductButton,
        this.productServices,
        this.reviewsSection,
        this.similarProductsSection,
        this.image,
    ]
    ;
}
  
}