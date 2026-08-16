import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object (uppercase) and the elements 
export class About {
    //page
    readonly page: Page;
    //Elements of the About Page
    readonly pageTitle: Locator;
    readonly notreHistoireSection: Locator;
    readonly chiffresSection: Locator;
    readonly nosValeursSection: Locator;
    readonly uneEquipePassionnéeSection: Locator;
    

    
    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements of the About Page
        this.pageTitle = page.getByRole('heading',  {name:'À propos de'});
        this.notreHistoireSection = page.getByRole('heading', {name: 'Notre histoire'});
        this.chiffresSection = page.locator('div.grid.grid-cols-2.gap-8');
        this.nosValeursSection = page.getByRole('heading', {name: 'Nos valeurs'});
        this.uneEquipePassionnéeSection = page.getByRole('heading', {name: 'Une équipe passionnée'});
    }

    //methods
    //Retrieve all elements to verify their display and ensure the PLP renders without errors in the test file
    getAllTheItems () {
    return [
        this.pageTitle,
        this.notreHistoireSection,
        this.chiffresSection,
        this.nosValeursSection,
        this.uneEquipePassionnéeSection,

    ]   ;
}
    
}