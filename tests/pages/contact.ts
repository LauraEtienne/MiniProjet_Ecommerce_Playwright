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
    //Toast
    readonly messageSentToast: Locator;


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
        // Target the <a> by its href (stable) rather than by concatenated visible text.
        // Scoped to <main> so the identical footer links are not matched.
        this.emailLink = page.getByRole('main').locator('a[href^="mailto:"]');
        this.phoneLink = page.getByRole('main').locator('a[href^="tel:"]');
        this.address = page.getByText('Adresse', { exact: true });
        this.supportClient = page.getByText('Support client', { exact: true });
        //Section Questions Fréquentes
        this.delayQuestion = page.getByRole('button', { name: 'Quels sont les délais de livraison ?' });
        this.delayAnswer = page.getByText('La livraison standard prend 2-4 jours ouvrés');
        this.productReturnQuestion = page.getByRole('button', { name: 'Comment retourner un produit ?' });
        this.productReturnAnswer = page.getByText('Vous disposez de 30 jours pour retourner un produit');
        this.warrantyQuestion = page.getByRole('button', { name: 'Les produits sont-ils garantis ?' });
        this.warrantyAnswer = page.getByText("Tous nos produits bénéficient d'une garantie de 2 ans");
        this.paymentQuestion = page.getByRole('button', { name: 'Quels modes de paiement acceptez-vous ?' });
        this.paymentAnswer = page.getByText('Nous acceptons les cartes bancaires');
        //Toast
        this.messageSentToast = page.getByText('Message envoyé ! Nous vous répondrons sous 24h.');

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
        await this.emailTextbox.fill(email);
        await this.subjectTextbox.fill(subject);
        await this.messageTextbox.fill(message);

        await this.sendMessageButton.click();
    }


    // Generic accordion toggle: opens a closed FAQ item, closes an open one.
    async toggleFAQ(question: Locator) {
        await question.click();
    }

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