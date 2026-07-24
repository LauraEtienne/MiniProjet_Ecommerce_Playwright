import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (uppercase)
export class Checkout {
    //page
    readonly page: Page;
    // Page1
    readonly deliveryTitle: Locator;
    readonly firstnameEdit: Locator;
    readonly nameEdit: Locator;
    readonly emailEdit: Locator;
    readonly phoneEdit: Locator;
    readonly addressEdit: Locator;
    readonly cityEdit: Locator;
    readonly postalCodeEdit: Locator;
    readonly goToPaymentButton: Locator;

    // Page2
    readonly paymentTitle: Locator;
    readonly cardNumberEdit: Locator;
    readonly cardNameEdit: Locator;
    readonly expirationDateEdit: Locator;
    readonly cvvEdit: Locator;
    readonly submitButton: Locator;
    readonly totalAmountLabel: Locator;

    // Page3
    readonly confirmationTitle: Locator;
    readonly successMessage: Locator;
    readonly cardConfirmation: Locator;
    readonly trackOrderButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly orderNumber: Locator;



    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        // Page1
        this.page = page;
        this.deliveryTitle = page.getByRole('heading', { name: 'Adresse de livraison' });
        this.firstnameEdit = page.getByTestId('shipping-firstname-input');
        this.nameEdit = page.getByTestId('shipping-lastname-input');
        this.emailEdit = page.getByTestId('shipping-email-input');
        this.phoneEdit = page.getByTestId('shipping-phone-input');
        this.addressEdit = page.getByTestId('shipping-address-input');
        this.cityEdit = page.getByTestId('shipping-city-input');
        this.postalCodeEdit = page.getByTestId('shipping-postalcode-input');
        this.goToPaymentButton = page.getByTestId('shipping-submit-button');
        // Page2
        this.paymentTitle = page.getByTestId('cart-count');
        this.cardNumberEdit = page.getByTestId('payment-cardnumber-input');
        this.cardNameEdit = page.getByTestId('clear-cart-button');
        this.expirationDateEdit = page.getByTestId('checkout-button');
        this.cvvEdit = page.getByTestId('continue-shopping-button');
        this.submitButton = page.getByTestId('payment-submit-button');
        this.totalAmountLabel = page.locator('span.text-2xl.font-bold');
        // Page3
        this.confirmationTitle = page.getByRole('heading', { name: 'Commande confirmée !' });
        this.successMessage = page.getByText('Merci pour votre commande.');
        this.cardConfirmation = page.getByTestId('order-confirmation-card');
        this.trackOrderButton = page.getByTestId('track-order-button');
        this.continueShoppingButton = page.getByTestId('continue-shopping-button');
        this.orderNumber = page.getByTestId('order-number');

    }

    //methods
    // Enter the details on the Delivery page and proceed to payment.
    async submitDeliveryData(prenom: string, nom: string, email: string, telephone: string, adresse: string, ville: string, codepostal: string) {
        await this.firstnameEdit.fill(prenom),
        await this.nameEdit.fill(nom),
        await this.emailEdit.fill(email),
        await this.phoneEdit.fill(telephone),
        await this.addressEdit.fill(adresse),
        await this.cityEdit.fill(ville),
        await this.postalCodeEdit.fill(codepostal),
        await this.goToPaymentButton.click()
}

    // Enter the details on the payment page and click the "Pay" button.
    async submitPaymentData(numCarte: string, nomcarte: string, dateExp: string, CVV: string) {
        await this.cardNumberEdit.fill(numCarte),
        await this.cardNameEdit.fill(nomcarte),
        await this.expirationDateEdit.fill(dateExp),
        await this.cvvEdit.fill(CVV),
        await this.submitButton.click()

    }

    // Return the total amount payable for the verification test.
    async getAmountToPay () : Promise<string> {
        const text = await this.totalAmountLabel.textContent();
       // If text contains a string (true), replace line breaks and multiple spaces with a single clean space
       // Otherwise (if text is null or undefined), return an empty string ''.     
       return text ? text.replace(/\s+/g, ' ').trim() : ''; 
       // Clean result: "149.99 €"

    }

    // Return the order number
    async getOrderNumber() : Promise<string>  {
       const text = await this.orderNumber.textContent();
       // If text contains a string (true), replace line breaks and multiple spaces with a single clean space
       // Otherwise (if text is null or undefined), return an empty string ''.
       return text ? text.replace(/\s+/g, ' ').trim() : ''; 

    }
    // Track my order
    async trackMyOrder():Promise<void> {
        await this.trackOrderButton.click();

    }

    // Continue shopping
    async continueShopping():Promise<void> {
        await this.continueShoppingButton.click();

    }

}