import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (uppercase)
export class Account {
    //https://shop.missionplaywright.fr/account
    //page
    readonly page: Page;
    //Elements page Compte
    readonly profileTab: Locator;
    readonly ordersTab: Locator;
    readonly parametersTab: Locator;
    readonly logoutButton: Locator;
    //Profil
    readonly personalDataTitle: Locator;
    readonly fullNameInput: Locator;
    readonly fullNameValue: Locator;
    readonly fullNameEdit: Locator;
    readonly phoneInput: Locator;
    readonly phoneValue: Locator;
    readonly phoneEdit: Locator;
    readonly cityInput: Locator;
    readonly cityValue: Locator;
    readonly cityEdit: Locator;
    readonly emailInput: Locator;
    readonly emailValue: Locator;
    readonly addressInput: Locator;
    readonly addressValue: Locator;
    readonly addressEdit: Locator;
    readonly postalCodeInput: Locator;
    readonly postalCodeValue: Locator;
    readonly postalCodeEdit: Locator;
    readonly modifyButton: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator;
    //Orders
    readonly ordersTitle: Locator;
    readonly decouvrirProduitsButton: Locator;
    //Parameters
    readonly parametersTitle: Locator;
    readonly notificationsparEmailStatus: Locator;
    readonly newsletterStatus: Locator;
    readonly deleteAccountButton: Locator;



    // The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page Compte
        this.profileTab = page.getByTestId('account-tab-profile');
        this.ordersTab = page.getByTestId('account-tab-orders');
        this.parametersTab = page.getByTestId('account-tab-settings');
        this.logoutButton = page.getByTestId('account-logout-button');
        //Profil
        this.personalDataTitle = page.getByRole('heading', { name: 'Informations personnelles' });
        this.fullNameInput = page.getByText('Nom complet');
        this.fullNameValue = page.locator('div.space-y-2', { hasText: 'Nom complet' }).locator('p.text-foreground');
        this.fullNameEdit = page.getByTestId('account-fullname-input');
        this.phoneInput = page.getByText('Téléphone');
        this.phoneValue = page.locator('div.space-y-2', { hasText: 'Téléphone' }).locator('p.text-foreground');
        this.phoneEdit = page.getByTestId('account-phone-input');
        this.cityInput = page.getByText('Ville');
        this.cityValue = page.locator('div.space-y-2', { hasText: 'Ville' }).locator('p.text-foreground');
        this.cityEdit = page.getByTestId('account-city-input');
        this.emailInput = page.getByText('Email');
        this.emailValue = page.locator('div.space-y-2', { hasText: 'Email' }).locator('p.text-foreground');
        this.addressInput = page.getByText('Adresse', { exact: true });
        this.addressValue = page.locator('div.space-y-2', { hasText: 'Adresse' }).locator('p.text-foreground');
        this.addressEdit = page.getByTestId('account-address-input');
        this.postalCodeInput = page.getByText('Code postal');
        this.postalCodeValue = page.locator('div.space-y-2', { hasText: 'Code postal' }).locator('p.text-foreground');
        this.postalCodeEdit = page.getByTestId('account-postalcode-input');
        this.modifyButton = page.getByTestId('account-edit-button');
        this.cancelButton = page.getByTestId('account-cancel-button');
        this.saveButton = page.getByTestId('account-save-button');
        //Orders
        this.ordersTitle = page.getByRole('heading', { name: 'Historique des commandes' });
        this.decouvrirProduitsButton = page.getByTestId('account-browse-products-button');
        //Parameters  
        this.parametersTitle = page.getByRole('heading', { name: 'Paramètres du compte' });
        this.notificationsparEmailStatus = page
        .locator('div.flex', { has: page.locator('h4', { hasText: 'Notifications par email' }) })
        .locator('div.text-foreground');
        this.newsletterStatus = page
        .locator('div.flex', { has: page.locator('h4', { hasText: 'Newsletter' }) })
        .locator('div.text-foreground');
        this.deleteAccountButton = page.getByTestId('account-delete-button');
    }

    //methods
    // Edit profile details
    async modifyProfileData(name: string, phone: string, city: string, address: string, postalCode: string) {
        //Click on Edit
        await this.modifyButton.click();
        //Fill in the editable fields
        await this.fullNameEdit.fill(name);
        await this.phoneEdit.fill(phone);
        await this.cityEdit.fill(city);
        await this.addressEdit.fill(address);
        await this.postalCodeEdit.fill(postalCode);
        //Click Save
        await this.saveButton.click();
    }


       // Edit profile data // .textContent() extracts the text from the target element
     async getStatutNotificationsEmail() {
        const texteRaw = await this.notificationsparEmailStatus.textContent();
        return texteRaw ? texteRaw.trim() : '';  //Condition ? Valeur_si_vrai : Valeur_si_faux

    }

    async getStatutNewsLetter() {
        const texteRaw = await this.newsletterStatus.textContent();
        return texteRaw ? texteRaw.trim() : '';  //Condition ? Valeur_si_vrai : Valeur_si_faux

    }


    // Delete account and Log out do not require methods

}