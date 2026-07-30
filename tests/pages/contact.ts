import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and the elements 
export class Contact {
    //page
    readonly page: Page;
    //Elements page Contact
    readonly pageTitle: Locator;
    readonly sendMessageSection: Locator;
    readonly informationSection: Locator;
    readonly questionsSection: Locator;
    //Section EnvoyezMessage
    readonly fullNameTextbox: Locator;
    readonly emailTextbox: Locator;
    readonly subjectTextbox: Locator;
    readonly messageTextbox: Locator;
    readonly sendMessageButton: Locator;
    //Section Informations
    readonly emailLink: Locator;
    readonly phoneLink: Locator;
    readonly address: Locator;
    readonly supportClient: Locator;
    //Section Questions Fréquentes
    readonly delayQuestion: Locator;
    readonly delayAnswer: Locator;
    readonly productReturnQuestion: Locator;
    readonly productReturnAnswer: Locator;
    readonly warrantyQuestion: Locator;
    readonly warrantyAnswer: Locator;
    readonly paymentQuestion: Locator;
    readonly paymentAnswer: Locator;


    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page Contact
        this.pageTitle = page.getByRole('heading', { name: 'Nous Contacter' });
        this.sendMessageSection = page.getByRole('heading', { name: 'Envoyez-nous un message' });
        this.informationSection = page.getByRole('heading', { name: 'Informations' });
        this.questionsSection = page.getByRole('heading', { name: 'Questions fréquentes' });
        //Section EnvoyezMessage
        this.fullNameTextbox = page.getByRole('textbox', { name: 'Nom complet' });
        this.emailTextbox = page.getByRole('textbox', { name: 'Email' });
        this.subjectTextbox = page.getByRole('textbox', { name: 'Sujet' });
        this.messageTextbox = page.getByRole('textbox', { name: 'Message' });
        this.sendMessageButton = page.getByRole('button', { name: 'Envoyer le message' });
        //Section Informations
        this.emailLink = page.getByRole('link', { name: 'Email contact@techhub.fr' });
        this.phoneLink = page.getByRole('link', { name: 'Téléphone 01 23 45 67' });
        this.address = page.getByText('Adresse');
        this.supportClient = page.getByText('Support Client');
        //Section Questions Fréquentes
        this.delayQuestion = page.getByRole('button', { name: 'Quels sont les délais de' });
        this.delayAnswer = page.getByText('La livraison standard prend 2');
        this.productReturnQuestion = page.getByRole('button', { name: 'Comment retourner un produit ?' });
        this.productReturnAnswer = page.getByText('Vous disposez de 30 jours');
        this.warrantyQuestion = page.getByRole('button', { name: 'Les produits sont-ils' });
        this.warrantyAnswer = page.getByText('Tous nos produits bénéficient');
        this.paymentQuestion = page.getByRole('button', { name: 'Quels modes de paiement' });
        this.paymentAnswer = page.getByText('Nous acceptons les cartes');

    }

    //methods
    // Retrieve all elements to verify their display in the test. 
    getAllSectionsandInfo() {
        return [
            this.pageTitle,
            this.sendMessageSection,
            this.informationSection,
            this.questionsSection,
            this.address,
            this.supportClient,

        ];
    }

    async sendMessage(fullName: string, email: string, subject: string, message: string) {
        await this.fullNameTextbox.fill(fullName);
        await this.fullNameTextbox.fill(email);
        await this.fullNameTextbox.fill(subject);
        await this.fullNameTextbox.fill(message);

        await this.sendMessageButton.click();
    }

    //    clickerEmailContact => to be done in the test file; no method needed here?
    //    clickerTéléphoneContact => to be done in the test file; no method needed here?

    async viewDelayFAQ() {
        //I click on a drawer
        await this.delayQuestion.click();
        //I return the response to verify its visibility in the test
        const delayAnswer = this.delayAnswer;
        return delayAnswer;
    }


    async viewProductReturnFAQ() {
        //I click on a drawer
        await this.productReturnQuestion.click();
        //I return the response to verify its visibility in the test
        const productReturnAnswer = this.productReturnAnswer;
        return productReturnAnswer;
    }

    async viewWarrantyFAQ() {
        //I click on a drawer
        await this.warrantyQuestion.click();
        //I return the response to verify its visibility in the test
        const warrantyAnswer = this.warrantyAnswer;
        return warrantyAnswer;
    }

    async viewPaymentFAQ() {
        //I click on a drawer
        await this.paymentQuestion.click();
        //I return the response to verify its visibility in the test
        const paymentAnswer = this.paymentAnswer;
        return paymentAnswer;
    }

}