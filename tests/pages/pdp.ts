import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class PDP {
    //page
    readonly page: Page;
    //Elements page PDP
    readonly titreProduit: Locator;
    readonly categorieProduit: Locator;
    readonly avisProduit: Locator;
    readonly prixProduit: Locator;
    readonly descriptionProduit: Locator;
    readonly caracteristiquesProduit: Locator;
    readonly stockProduit: Locator;
    readonly ctaAjouterProduit: Locator;
    readonly ctaFavoriProduit: Locator;
    readonly ctaPartagerProduit: Locator;
    readonly servicesProduit: Locator;
    readonly sectionAvis: Locator;
    readonly sectionProduitsSimilaires: Locator;
    readonly image: Locator;
    readonly retourCatalogue: Locator;






    
    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page PDP
        this.titreProduit = page.locator('h1');
        this.categorieProduit = page.locator('p.text-primary.uppercase'); //balise.class.class 
        this.avisProduit = page.locator('div.flex.items-center.gap-3.mb-6').filter({ hasText: 'avis' });
        this.prixProduit = page.locator('div.flex.items-baseline.gap-4.mb-6').locator('span.text-4xl.font-bold');
        this.descriptionProduit = page.locator('text-muted-foreground.mb-8');
        this.caracteristiquesProduit = page.getByRole('heading', {name : 'Caractéristiques'});
        this.stockProduit = page.locator('p.text-sm.font-medium.flex.items-center.gap-2.text-primary').filter({ hasText: 'stock'});
        this.ctaAjouterProduit = page.getByTestId('product-detail-add-to-cart');
        this.ctaFavoriProduit = page.getByTestId('product-detail-wishlist-button');
        this.ctaPartagerProduit = page.getByTestId('product-detail-share-button');
        this.servicesProduit = page.locator('div.grid.grid-cols-3.gap-4.p-4.bg-muted/50.rounded-2xl');
        this.sectionAvis = page.getByRole('heading', {name:'Avis clients' });
        this.sectionProduitsSimilaires = page.getByRole('heading', {name: 'Produits similaires'});
        this.image = page.locator('img.object-cover'); // generaliser
        this.retourCatalogue = page.getByRole('link', {name: 'Retour au catalogue'});


    }

    //méthodes
    // Récupérer toutes les élémets pour en vérifier l'affichage et que la PLP s'affiche sans erreur dans le fichier de test
    getTousLesEléments () {
    return [
        this.titreProduit,
        this.categorieProduit,
        this.avisProduit,
        this.prixProduit,
        this.descriptionProduit,
        this.caracteristiquesProduit,
        this.stockProduit,
        this.ctaAjouterProduit,
        this.ctaFavoriProduit,
        this.ctaPartagerProduit,
        this.servicesProduit,
        this.sectionAvis,
        this.sectionProduitsSimilaires,
        this.image,

    ]   ;
}

    
}