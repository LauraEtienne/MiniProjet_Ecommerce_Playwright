import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Définir l'objet Page et les éléments (majuscule)
export class Authentication {
    //https://shop.missionplaywright.fr/auth
    //page
    readonly page: Page;
    //Elements page Authentification
    readonly loginTab: Locator;
    readonly signUpTab: Locator;
    readonly conditionsUtilisationLink: Locator;
    readonly politiqueConfidentialiteLink: Locator;
    //Connexion
    readonly loginPageTitle: Locator;
    readonly connexionEmailInput: Locator;
    readonly connexionPasswordInput: Locator;
    readonly forgotPasswordLink: Locator;
    readonly loginSubmitButton: Locator;
    //Inscription
    readonly inscriptionPageTitle: Locator;
    readonly inscriptionFullNameInput: Locator;
    readonly inscriptionEmailInput: Locator;
    readonly inscriptionPasswordInput: Locator;
    readonly inscriptionConfirmationPasswordInput: Locator;
    readonly singnUpButton: Locator;
    readonly successNotification: Locator;
    readonly errNameFormat: Locator;
    readonly errEmailFormat: Locator;
    readonly errPasswordFormat: Locator;
    readonly errPasswordDoNotMatch: Locator;
    //MotdePasseOublie
    readonly passwordPageTitle: Locator;
    readonly forgotEmailInput: Locator;
    readonly forgotSubmitButton: Locator;
    readonly forgotBackLink: Locator;


    //Le constructeur initialise les éléments // Localiser les éléments
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page Authentificaton
        this.loginTab = page.getByTestId('login-tab');
        this.signUpTab = page.getByTestId('signup-tab');
        this.conditionsUtilisationLink = page.getByRole('link', { name: 'Conditions d\'utilisation' });
        this.politiqueConfidentialiteLink = page.getByRole('link', { name: 'Politique de confidentialité' });
        //Connexion
        this.loginPageTitle = page.getByRole('heading', { name: 'Connexion' });
        this.connexionEmailInput = page.getByTestId('login-email-input');
        this.connexionPasswordInput = page.getByTestId('login-password-input');
        this.forgotPasswordLink = page.getByTestId('forgot-password-link');
        this.loginSubmitButton = page.getByTestId('login-submit-button');
        //Inscription
        this.inscriptionPageTitle = page.getByRole('heading', { name: 'Créer un compte' });
        this.inscriptionFullNameInput = page.getByTestId('signup-name-input');
        this.inscriptionEmailInput = page.getByTestId('signup-email-input');
        this.inscriptionPasswordInput = page.getByTestId('signup-password-input');
        this.inscriptionConfirmationPasswordInput = page.getByTestId('signup-confirm-password-input');
        this.singnUpButton = page.getByTestId('signup-submit-button');
        this.successNotification = page.getByRole('status').getByText('Inscription réussie !');
        this.errNameFormat = page.getByText('Le nom doit contenir au moins');
        this.errEmailFormat = page.getByText('Adresse email invalide');
        this.errPasswordFormat = page.getByText('Le mot de passe doit contenir');
        this.errPasswordDoNotMatch = page.getByText('Les mots de passe ne');
        //MotdePasseOublie
        this.passwordPageTitle = page.getByRole('heading', { name: 'Mot de passe oublié' });
        this.forgotEmailInput = page.getByTestId('forgot-email-input');
        this.forgotSubmitButton = page.getByTestId('forgot-submit-button');
        this.forgotBackLink = page.getByTestId('forgot-back-button');
    }

    //méthodes
    // S'inscrire avec paramètres en entrée / méthode à utiliser pour cas passant et cas non passants = champs obligatoires, email incorrect, confirmation mot de passe incorrect
    async submitInscriptionForm(name: string, email: string, password: string, passwordConfirmation: string) {
        //renseigner tous les champs du formulaire
        await this.inscriptionFullNameInput.fill(name);
        await this.inscriptionEmailInput.fill(email);
        await this.inscriptionPasswordInput.fill(password);
        await this.inscriptionConfirmationPasswordInput.fill(passwordConfirmation);

        //cliquer sur Créer mon compte
        await this.singnUpButton.click();
        //l'affichage du message de succès sera faite dans le fichier de test correspodant

    }


    async submitConnexionForm(email: string, password: string) {
        //saisir champs et cliquer sur le bouton
        await this.connexionEmailInput.fill(email);
        await this.connexionPasswordInput.fill(password);

        await this.loginSubmitButton.click();

    }

    async goToForgetPassword() {
        await this.forgotPasswordLink.click();
    }

    async submitPasswordReset(email:string) {
        await this.forgotEmailInput.fill(email);

        await this.forgotSubmitButton.click();
    }

    async goBackToConnexion() {
        await this.forgotBackLink.click();
    }

    //    consulter Conditions d'utilisation => à faire dans fichier de test, pas de méthode nécessaire ici?
    //    consulter Politique de confidentialité => à faire dans fichier test, pas de méthode nécessaire ici?



}