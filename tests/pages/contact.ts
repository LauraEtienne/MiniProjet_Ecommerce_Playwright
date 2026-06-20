import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Contact {
    //page
    readonly page: Page;
    //Elements page Contact
    readonly titrePage: Locator;
    readonly sectionEnvoyezMessage: Locator;
    readonly sectionInformations: Locator;
    readonly sectionQuestionsFrequentes: Locator;
    //Section EnvoyezMessage
    readonly nomComplet: Locator;
    readonly email: Locator;
    readonly sujet: Locator;
    readonly message: Locator;
    readonly CTAEnvoyerMessage: Locator;
    //Section Informations
    readonly emailinfo: Locator;
    readonly telephone: Locator;
    readonly adresse: Locator;
    readonly supportClient: Locator;
    //Section Questions Fréquentes
    readonly questionDelai: Locator;
    readonly reponseDelai: Locator;
    readonly questionRetourProduit: Locator;
    readonly reponseRetourProduit: Locator;
    readonly questionGarantie: Locator;
    readonly reponseGarantie: Locator;
    readonly questionPaiement: Locator;
    readonly reponsePaiement: Locator;


    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page Contact
        this.titrePage = page.getByRole('heading', { name: 'Nous Contacter' });
        this.sectionEnvoyezMessage = page.getByRole('heading', { name: 'Envoyez-nous un message' });
        this.sectionInformations = page.getByRole('heading', { name: 'Informations' });
        this.sectionQuestionsFrequentes = page.getByRole('heading', { name: 'Questions fréquentes' });
        //Section EnvoyezMessage
        this.nomComplet = page.getByRole('textbox', { name: 'Nom complet' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.sujet = page.getByRole('textbox', { name: 'Sujet' });
        this.message = page.getByRole('textbox', { name: 'Message' });
        this.CTAEnvoyerMessage = page.getByRole('button', { name: 'Envoyer le message' });
        //Section Informations
        this.emailinfo = page.getByRole('link', { name: 'Email contact@techhub.fr' });
        this.telephone = page.getByRole('link', { name: 'Téléphone 01 23 45 67' });
        this.adresse = page.getByText('Adresse');
        this.supportClient = page.getByText('Support Client');
        //Section Questions Fréquentes
        this.questionDelai = page.getByRole('button', { name: 'Quels sont les délais de' });
        this.reponseDelai = page.getByText('La livraison standard prend 2');
        this.questionRetourProduit = page.getByRole('button', { name: 'Comment retourner un produit ?' });
        this.reponseRetourProduit = page.getByText('Vous disposez de 30 jours');
        this.questionGarantie = page.getByRole('button', { name: 'Les produits sont-ils' });
        this.reponseGarantie = page.getByText('Tous nos produits bénéficient');
        this.questionPaiement = page.getByRole('button', { name: 'Quels modes de paiement' });
        this.reponsePaiement = page.getByText('Nous acceptons les cartes');

    }

    //méthodes
    // Récupérer toutes les élémets pour en vérifier l'affichage dans le test 
    getToutesLesSectionsetlesInformationsSansInteractions() {
        return [
            this.titrePage,
            this.sectionEnvoyezMessage,
            this.sectionInformations,
            this.sectionQuestionsFrequentes,
            this.adresse,
            this.supportClient,

        ];
    }

    async envoyerMessage(nomComplet: string, email: string, sujet: string, message: string) {
        await this.nomComplet.fill(nomComplet);
        await this.nomComplet.fill(email);
        await this.nomComplet.fill(sujet);
        await this.nomComplet.fill(message);

        await this.CTAEnvoyerMessage.click();
    }

    //    clickerEmailContact => à faire dans fichier de test, pas de méthode nécessaire ici?
    //    clickerTéléphoneContact => à faire dans fichier test, pas de méthode nécessaire ici?

    async consulterFAQDelai() {
        //je clic sur un titroir
        await this.questionDelai.click();
        //je retroune la réponse pour en vérifier la visibilité dans le test
        const responseDelai = this.reponseDelai;
        return responseDelai;
    }


    async consulterFAQRetourProduit() {
        //je clic sur un titroir
        await this.questionRetourProduit.click();
        //je retroune la réponse pour en vérifier la visibilité dans le test
        const responseRetourProduit = this.reponseRetourProduit;
        return responseRetourProduit;
    }

    async consulterFAQGarantie() {
        //je clic sur un titroir
        await this.questionGarantie.click();
        //je retroune la réponse pour en vérifier la visibilité dans le test
        const responseGarantie = this.reponseGarantie;
        return responseGarantie;
    }

    async consulterFAQPaiement() {
        //je clic sur un titroir
        await this.questionPaiement.click();
        //je retroune la réponse pour en vérifier la visibilité dans le test
        const responsePaiement = this.reponsePaiement;
        return responsePaiement;
    }

}