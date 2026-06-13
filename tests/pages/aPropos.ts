import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class APropos {
    //page
    readonly page: Page;
    //Elements page à Propos
    readonly titrePage: Locator;
    readonly sectionNotreHistoire: Locator;
    readonly sectionChiffres: Locator;
    readonly sectionNosValeurs: Locator;
    readonly sectionUneEquipePassionnée: Locator;
    



    
    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page A propos
        this.titrePage = page.getByRole('heading',  {name:'À propos de'});
        this.sectionNotreHistoire = page.getByRole('heading', {name: 'Notre histoire'});
        this.sectionChiffres = page.locator('div.grid.grid-cols-2.gap-8');
        this.sectionNosValeurs = page.getByRole('heading', {name: 'Nos valeurs'});
        this.sectionUneEquipePassionnée = page.getByRole('heading', {name: 'Une équipe passionnée'});
    }

    //méthodes
    // Récupérer toutes les élémets pour en vérifier l'affichage et que la PLP s'affiche sans erreur dans le fichier de test
    getTousLesEléments () {
    return [
        this.titrePage,
        this.sectionNotreHistoire,
        this.sectionChiffres,
        this.sectionNosValeurs,
        this.sectionUneEquipePassionnée,

    ]   ;
}
    
}