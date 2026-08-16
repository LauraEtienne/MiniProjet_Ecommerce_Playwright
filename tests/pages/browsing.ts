import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (capitalized)
export class Browsing {
    //page
    readonly page: Page;
   
    
    //Elements page PLP footer
    readonly techHubFooter: Locator;
    readonly produitsFooter: Locator;
    readonly entrepriseFooter: Locator;
    readonly supportFooter: Locator;
    readonly legalFooter: Locator;


    //Elements page PLP Header
    readonly accueilHeader: Locator;
    readonly produitsHeader: Locator;
    readonly aproposHeader: Locator;
    readonly contactHeader: Locator;
    readonly searchHeader: Locator;
    readonly cartHeader: Locator;
    readonly loginHeader: Locator;
    //Displayed if the user is authenticated:
    readonly accountLink: Locator;
    readonly logoutButton: Locator;
    readonly userMenuButton: Locator; 


    
    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page PLP Footer
        this.techHubFooter = page.getByRole('contentinfo').getByRole('link', { name: 'TechHub', exact: true });
        this.produitsFooter = page.getByRole('heading', { name: 'Produits', exact: true });
        this.entrepriseFooter = page.getByRole('heading', { name: 'Entreprise' });
        this.supportFooter = page.getByRole('heading', { name: 'Support' });
        this.legalFooter = page.getByRole('heading', { name: 'Légal' });

        //Elements page PLP Header
        this.accueilHeader = page.getByTestId('nav-link-home');
        this.produitsHeader = page.getByTestId('nav-link-products');
        this.aproposHeader = page.getByTestId('nav-link-about');
        this.contactHeader = page.getByTestId('nav-link-contact');
        this.searchHeader = page.getByTestId('search-button');
        this.cartHeader = page.getByTestId('cart-button');
        this.loginHeader = page.getByTestId('login-button'); // For the "Log out" status
        //Displayed if the user is authenticated:
        this.accountLink = page.getByTestId('account-link'); // The link within the menu
        this.logoutButton = page.getByTestId('logout-button');
        this.userMenuButton = page.getByTestId('user-menu-button');

    }

    //methods
    // Retrieve all elements to verify their display and ensure that the PLP is displayed without errors in the test file
    getAllElements () {
    return [
        this.techHubFooter,
        this.produitsFooter,
        this.entrepriseFooter,
        this.legalFooter,
        this.produitsFooter,
        this.supportFooter,
        this.accueilHeader,
        this.aproposHeader,
        this.produitsHeader,
        this.contactHeader,
        this.searchHeader,
        this.cartHeader,
        this.loginHeader,
    ]   ;
}

//Verify that the link works—the URL should be specified in the test file
    async clickLinkAndCheckItWorks(link: Locator, expectedURL: RegExp) {
    //click on the link
    await link.click();  
    //verify that the redirect is working properly
    await expect (this.page).toHaveURL(expectedURL);
    }

//The authenticated user accesses their account after being redirected to the home page
    async clickMyAccountAfterAuthentication(){   
    // 1. We expect the button to be clearly visible on the screen after registration
    await this.userMenuButton.waitFor({ state: 'visible' });
    // 2. Click the profile icon to open the drop-down menu
    await this.userMenuButton.click();
    // 3. Click the "My Account" link in the menu
    await this.accountLink.click();
        
    }

//The unauthenticated user wants to authenticate
    async clickLoginHeader() {
    //Click on the login icon in the header
    await this.loginHeader.click();        
    }


//The user wants to log out
    async logoutFromHeader() {
    //Click on the login icon in the header
    await this.loginHeader.click();
    //Click on "My Account"
    await this.logoutButton.click();  
        
    }

   }