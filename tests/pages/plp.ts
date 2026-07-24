import { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (capitalized)
export class PLP {
    //page
    readonly page: Page;
    //Elements page PLP
    readonly pageTitle: Locator;
    readonly productsContainer: Locator;
    readonly plpProduct: Locator;
    readonly filtersButton: Locator;
    //List of category-based filter options
    readonly filterAccessoryOption: Locator;
    // TO be COMPLETED
    //List of price-based filter options
    readonly filterOptionPriceUnder100: Locator;
    // TO BE COMPLETED
    readonly sortCombobox: Locator;
    readonly gridDisplay: Locator;
    readonly listDisplay: Locator;
    readonly resetButton: Locator;


    
    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;

        //Elements page PLP
        this.pageTitle = page.getByRole('heading', { name: 'Notre Catalogue' });
        this.productsContainer = page.locator('div:has(> div.group)').first(); 
        this.plpProduct = page.getByTestId('product-card-1');
        this.filtersButton = page.getByRole('button', { name: 'Filtres' });
        this.filterAccessoryOption = page.getByRole('button', { name: 'Accessoires' });
        this.filterOptionPriceUnder100 = page.getByRole('button', { name: 'Moins de 100€' });
        this.sortCombobox = page.getByRole('combobox');
        this.gridDisplay = page.locator('div').filter({ hasText: /^Filtres12 produitsNouveautésPopularitéPrix croissantPrix décroissant$/ }).getByRole('button').nth(1);
        this.listDisplay = page.locator('div').filter({ hasText: /^Filtres12 produitsNouveautésPopularitéPrix croissantPrix décroissant$/ }).getByRole('button').nth(2);
        this.resetButton = page.getByRole('button', { name: 'Réinitialiser' });


    }

    //methods
    //Retrieve all elements to verify their display and ensure that the PLP is displayed without errors in the test file
    getAllElements () {
    return [
        this.pageTitle,
        this.plpProduct,
        this.filtersButton,
        this.sortCombobox,
        this.gridDisplay,
        this.listDisplay,
    ]   ;
}

    //Switch to List View
    async switchToListView() {
    //Clic on grid
    await this.gridDisplay.click(); 
    //Check to see if the display is in grid mode
    await expect(this.productsContainer).toHaveClass(/.*grid.*/);
    //Click on List
    await this.listDisplay.click(); 
    //Check to see if the display is in list mode
    await expect(this.productsContainer).toHaveClass(/.*flex.*/);
    }

    //Click on a product and check that the product page appears 
    async clickProductLinkAndCheckItWorks(product: Locator, expectedURL: RegExp) {
    //Click on the link
    await product.click();  
    //Verify that the redirect is working properly
    await expect (this.page).toHaveURL(expectedURL);
    }

    //Filter
    async filterProducts(filterCategoryOption: Locator, filterPriceOption: Locator, ) {    
    //Click on filter button
    await  this.filtersButton.click();  
    //Click on a "Category" filter option
    await filterCategoryOption.click();
    //click on a "Price" filter option
    await filterPriceOption.click();

    //Check the tech-gradient buttons
    await expect (filterCategoryOption).toHaveClass(/.*tech-gradient.*/);
    await expect (filterPriceOption).toHaveClass(/.*tech-gradient.*/);
    }


    //Sort
    async sortProductbyNewArrivals(sortOption: string) {
    //Click on sort button
    await this.sortCombobox.click();  
    //Select option
    await this.sortCombobox.selectOption(sortOption);
    //Make sure that the products displayed first are the new arrivals
    //TODO
    }

    }