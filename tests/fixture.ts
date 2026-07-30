//1-IMPORT PROJECT CLASSES FROM THEIR RESPECTIVE FILES
// "In the 'pages' folder right next to you," you use a single period followed by a slash: ./
import { test as base } from '@playwright/test';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Authentication } from './pages/authentication';
import { Checkout } from './pages/checkout';
import { Account } from './pages/account';
import { Contact } from './pages/contact';
import { Cart } from './pages/cart';
import { PDP } from './pages/pdp';
import { PLP } from './pages/plp';
import { Browsing } from './pages/browsing';


//2-CREATION OF THE MAIN FIXTURE OBJECT AND ITS PROPERTIES THAT CORRESPOND TO THE POMS CLASSES
//We list all the objects (Page Objects) that we want to make available in our tests
type MyFixtures = {
    homePage: Home;
    aboutPage: About;
    authentificationPage: Authentication;
    checkoutPage: Checkout;
    accountPage: Account;
    contactPage: Contact;
    browsing: Browsing;
    cartPage: Cart;
    pdpPage: PDP;
    plpPage: PLP;

}

//3- EXPORTING THE EXTENDED TEST, INCLUDING THE INSTANTIATION OF PROJECT-SPECIFIC OBJECTS
export const test = base.extend<MyFixtures>({
//property names listed in the test file, in lowercase, and created in Step 2   
homePage: async ({page}, use)=> {
    //instantiation: An instance (lowercase) is the object created from the Class (uppercase), imported in step 1 and derived from the POMs
    //The instance is temporary and local
    const accueil = new Home(page);
    //The instance is injected into the property that will be used in the test
    await use(accueil);
},

aboutPage: async ({page}, use)=> {
    //instantiation
    const apropos = new About(page);
    //The instance is injected into the property that will be used in the test
    await use(apropos);
},

authentificationPage: async ({page}, use)=> {
    //instantiation
    const auth = new Authentication(page);
    //The instance is injected into the property that will be used in the test
    await use(auth);
},

checkoutPage: async ({page}, use)=> {
    //instantiation
    const checkout = new Checkout(page);
    //The instance is injected into the property that will be used in the test
    await use(checkout);
},

accountPage: async ({page}, use)=> {
    //instantiation
    const compte = new Account(page);
    //The instance is injected into the property that will be used in the test
    await use(compte);
},

contactPage: async ({page}, use)=> {
    //instantiation
    const contact = new Contact(page);
    //The instance is injected into the property that will be used in the test
    await use(contact);
},

browsing: async ({page}, use)=> {
    //instantiation
    const nav = new Browsing(page);
    //The instance is injected into the property that will be used in the test
    await use(nav);
},

cartPage: async ({page}, use)=> {
    //instantiation
    const panier = new Cart(page);
    //The instance is injected into the property that will be used in the test
    await use(panier);
},

pdpPage: async ({page}, use)=> {
    //instantiation
    const pdp = new PDP(page);
    //The instance is injected into the property that will be used in the test
    await use(pdp);
},

plpPage: async ({page}, use)=> {
    //instantiation
    const plp = new PLP(page);
    //The instance is injected into the property that will be used in the test
    await use(plp);
}

})


//4-We re-export "expect" so we don't have to import it from @playwright/test elsewhere
export { expect } from '@playwright/test';