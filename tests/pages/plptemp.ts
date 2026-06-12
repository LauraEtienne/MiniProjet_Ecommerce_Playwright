import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class PLP {
    //page
    readonly page: Page;
    //Elements page PLP
    readonly titrePage: Locator;
    readonly conteneurProduits: Locator;
    readonly produitPLP: Locator;
    readonly boutonFiltres: Locator;
    //liste options filtre de type categorie
    readonly optionFiltreCatAccessoire: Locator;
    // à compléter
    //liste options filtre de type prix
    readonly optionFiltrePrixInf100: Locator;
    // à compléter
    readonly listeTri: Locator;
    readonly affichageGrille: Locator;
    readonly affichageListe: Locator;
    readonly reinitialiser: Locator;


    
    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page PLP
        this.titrePage = page.getByRole('heading', { name: 'Notre Catalogue' });
        this.conteneurProduits = page.locator('div:has(> div.group)').first(); 
        this.produitPLP = page.getByTestId('product-card-1');
        this.boutonFiltres = page.getByRole('button', { name: 'Filtres' });
        this.optionFiltreCatAccessoire = page.getByRole('button', { name: 'Accessoires' });
        this.optionFiltrePrixInf100 = page.getByRole('button', { name: 'Moins de 100€' });
        this.listeTri = page.getByRole('combobox');
        this.affichageGrille = page.locator('div').filter({ hasText: /^Filtres12 produitsNouveautésPopularitéPrix croissantPrix décroissant$/ }).getByRole('button').nth(1);
        this.affichageListe = page.locator('div').filter({ hasText: /^Filtres12 produitsNouveautésPopularitéPrix croissantPrix décroissant$/ }).getByRole('button').nth(2);
        this.reinitialiser = page.getByRole('button', { name: 'Réinitialiser' });


    }

    //méthodes
    // Récupérer toutes les élémets pour en vérifier l'affichage et que la PLP s'affiche sans erreur dans le fichier de test
    getTousLesEléments () {
    return [
        this.titrePage,
        this.produitPLP,
        this.boutonFiltres,
        this.listeTri,
        this.affichageGrille,
        this.affichageListe,
    ]   ;
}

    //Passer de vue grille à vue Liste
    async changerVuedeGridaList() {
    //je clic sur grid
    await this.affichageGrille.click(); 
    //je vérifie que l'affichage est en mode grid
    await expect(this.conteneurProduits).toHaveClass(/.*grid.*/);
    //je clic sur liste
    await this.affichageListe.click(); 
    //je vérifie que l'affichage est en mode liste
    await expect(this.conteneurProduits).toHaveClass(/.*flex.*/);
    }

    //Cliquer sur un produit et vérifier que la page produit s'affiche 
    async cliquersurLienProduitetVérifierFonctionnel(lien: Locator, urlAttendue: RegExp) {
    //on clic sur le lien
    await lien.click();  
    //on vérifie la bonne redirection
    await expect (this.page).toHaveURL(urlAttendue);
    }

    //Filtrer
    async filtrerProduits(boutonFiltres: Locator, optionFiltreCat: Locator, optionFiltrePrix: Locator, ) {    
    //on clic sur le bouton filtrer
    await boutonFiltres.click();  
    //on clic sur une option de filtre de type Categorie
    await optionFiltreCat.click();
    //on clic sur une option de filtre de type Prix
    await optionFiltrePrix.click();

    //verifier boutons tech-gradient
    await expect (optionFiltreCat).toHaveClass(/.*tech-gradient.*/);
    await expect (optionFiltrePrix).toHaveClass(/.*tech-gradient.*/);
    }


    //Trier
    async trierProduitsparNouveautés(optionTri: string) {
    //on clic le bouton de tri
    await this.listeTri.click();  
    //sélectionner l'option
    await this.listeTri.selectOption(optionTri);
    //verifier que les produits affichés en premier son les nouveautés
    //TODO
    }

    }