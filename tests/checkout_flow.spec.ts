import { test, expect } from './fixture';
import users from '../tests/data/users.json'; //import du fichier
import { PLP } from './pages/plp';

test.beforeEach(async ({ page}) => {
    await page.goto(process.env.URL!);
     waitUntil: 'networkidle'

});

test('The user places an order successfully', async ({ page, browsing, authenticationPage: authentificationPage, plpPage, pdpPage, cartPage, checkoutPage,accountPage }) => {

    await test.step('The user logs in', async () => {
        //Authentication
        //1. Go to the auth page from the header
        await browsing.loginHeader.click();
        //2. Fill out and submit the login form
        await authentificationPage.submitConnexionForm(users.authentifiCheckout.email,users.authentifiCheckout.password);
        });



    await test.step('The user navigates to the product list', async () => {
        //User clicks on "Produits" in the header
        await browsing.produitsHeader.click();
        //Check that the Products page is displayed
        await expect(plpPage.pageTitle).toBeVisible();
        });



    await test.step('The user goes to the PDP and adds the product to the shopping cart', async () => {
        //User clicks on a product card
        await plpPage.clickProductLinkAndCheckItWorks(plpPage.plpProduct,/.*\/product\/1/)//product in regex format
        //user adds product to the cart
        await pdpPage.addToCartButton.click();

        });



    await test.step('The user goes to the cart and check that the product is displayed', async () => {
         //User clicks on the cart icon in the header
         await browsing.cartHeader.click();
         //Cart must be displayed
         await expect(page).toHaveURL(/\/cart/);
         await expect(cartPage.pageTitle).toBeVisible();
         //User check his/her cart
         //TO BE COMPLETED -----------------------------------------
        
         });


    await test.step('The user goes to checkout and proceeds with payment successfully', async () => {
        //User clicks on the "Passer au Paiment" button
        await cartPage.checkoutButton.click();
        //Checkout must be displayed 
        await expect(checkoutPage.deliveryTitle).toBeVisible();
        //additional explicit wait to avoid flakiness
        await expect(checkoutPage.firstnameEdit).toBeVisible();
        //User submit delivery data
        await checkoutPage.submitDeliveryData(users.authentifiCheckout.firstName,users.authentifiCheckout.lastName, users.authentifiCheckout.email, users.authentifiCheckout.phone,users.authentifiCheckout.address,users.authentifiCheckout.city,users.authentifiCheckout.postalCode);
        //additional explicit wait to avoid flakiness
        await expect(checkoutPage.cardNumberEdit).toBeVisible();
        //User submit payment
        await checkoutPage.submitPaymentData(users.authentifiCheckout.cardNumber,users.authentifiCheckout.cardName, users.authentifiCheckout.expirationDate, users.authentifiCheckout.CVV);
        //User sees the success message
        await expect(checkoutPage.successMessage).toBeVisible();
        });

    });