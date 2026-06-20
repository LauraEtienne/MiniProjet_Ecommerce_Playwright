import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Authentification {
    //https://shop.missionplaywright.fr/auth
    //page
    readonly page: Page;
    //Elements page Authentification
    readonly boutonConnexion: Locator;
    readonly boutonInscription: Locator;
    readonly conditionsUtilisation: Locator;
    readonly politiqueConfidentialite: Locator;
    //Connexion
    readonly titrePageConnexion: Locator;
    readonly emailConnexion: Locator;
    readonly motDePasseConnexion: Locator;
    readonly motDePasseOublie: Locator;
    readonly ctaSeConnecter: Locator;
    //Inscription
    readonly titrePageInscription: Locator;
    readonly nomComplet: Locator;
    readonly email: Locator;
    readonly motDePasseInscription: Locator;
    readonly confirmermotDePasseInscription: Locator;
    readonly ctaCreerCompte: Locator;
    readonly notificationSucces: Locator;
    readonly errNomFormat: Locator;
    readonly errEmailFormat: Locator;
    readonly errMotPasseFormat: Locator;
    readonly errMotPasseNeCorrespondentPas: Locator;
    //MotdePasseOublie
    readonly titrePageMDP: Locator;
    readonly emailMDP: Locator;
    readonly ctaEnvoyerLeLien: Locator;
    readonly retourConnexion: Locator;


    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page Authentificaton
        this.boutonConnexion = page.getByTestId('login-tab');
        this.boutonInscription = page.getByTestId('signup-tab');
        this.conditionsUtilisation = page.getByRole('link', { name: 'Conditions d\'utilisation' });
        this.politiqueConfidentialite = page.getByRole('link', { name: 'Politique de confidentialité' });
        //Connexion
        this.titrePageConnexion = page.getByRole('heading', { name: 'Connexion' });
        this.emailConnexion = page.getByTestId('login-email-input');
        this.motDePasseConnexion = page.getByTestId('login-password-input');
        this.motDePasseOublie = page.getByTestId('forgot-password-link');
        this.ctaSeConnecter = page.getByTestId('login-submit-button');
        //Inscription
        this.titrePageInscription = page.getByRole('heading', { name: 'Créer un compte' });
        this.nomComplet = page.getByTestId('signup-name-input');
        this.email = page.getByTestId('signup-email-input');
        this.motDePasseInscription = page.getByTestId('signup-password-input');
        this.confirmermotDePasseInscription = page.getByTestId('signup-confirm-password-input');
        this.ctaCreerCompte = page.getByTestId('signup-submit-button');
        this.notificationSucces = page.getByRole('status').getByText('Inscription réussie !');
        this.errNomFormat = page.getByText('Le nom doit contenir au moins');
        this.errEmailFormat = page.getByText('Adresse email invalide');
        this.errMotPasseFormat = page.getByText('Le mot de passe doit contenir');
        this.errMotPasseNeCorrespondentPas = page.getByText('Les mots de passe ne');
        //MotdePasseOublie
        this.titrePageMDP = page.getByRole('heading', { name: 'Mot de passe oublié' });
        this.emailMDP = page.getByTestId('forgot-email-input');
        this.ctaEnvoyerLeLien = page.getByTestId('forgot-submit-button');
        this.retourConnexion = page.getByTestId('forgot-back-button');
    }

    //méthodes
    // S'inscrire avec paramètres en entrée / méthode à utiliser pour cas passant et cas non passants = champs obligatoires, email incorrect, confirmation mot de passe incorrect
    async soumettreFormulaireInscription(nom: string, email: string, motdePasse: string, confirmationMotDePasse: string) {
        //renseigner tous les champs du formulaire
        await this.nomComplet.fill(nom);
        await this.email.fill(email);
        await this.motDePasseInscription.fill(motdePasse);
        await this.confirmermotDePasseInscription.fill(confirmationMotDePasse);

        //cliquer sur Créer mon compte
        await this.ctaCreerCompte.click();
        //l'affichage du message de succès sera faite dans le fichier de test correspodant

    }


    async soumettreFormulaireConnexion(email: string, moteDePasse: string) {
        //saisir champs et cliquer sur le bouton
        await this.emailConnexion.fill(email);
        await this.motDePasseConnexion.fill(moteDePasse);

        await this.ctaSeConnecter.click();

    }

    async allerSurMotDePasseOublie() {
        await this.motDePasseOublie.click();
    }

    async soumettreReinitialisationMotDePasse(email:string) {
        await this.emailMDP.fill(email);

        await this.ctaEnvoyerLeLien.click();
    }

    async retournerAlaConnexion() {
        await this.retourConnexion.click();
    }

    //    consulter Conditions d'utilisation => à faire dans fichier de test, pas de méthode nécessaire ici?
    //    consulter Politique de confidentialité => à faire dans fichier test, pas de méthode nécessaire ici?



}