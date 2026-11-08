import { Page, Locator } from '@playwright/test';
//import { fakerFR as faker } from '@faker-js/faker';

// Define the Page object and elements (capitalized)
export class Cart {
    //page
    readonly page: Page;

    readonly pageTitle: Locator;
    readonly clearCartButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartCount: Locator;


    //The constructor initializes the elements // Locate the elements
    constructor(page: Page) {
        //Page
        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Votre Panier' });
        this.clearCartButton = page.getByTestId('clear-cart-button');
        this.checkoutButton = page.getByTestId('checkout-button');
        this.continueShoppingButton = page.getByTestId('continue-shopping-button');
        this.cartCount = page.getByTestId('cart-count');
        
  
    }

    //methods
    //Locate the quantity of a product
    getProductQuantity (productId: number):Locator {
        const productQuantityLocator = this.page.getByTestId(`quantity-${productId}`);
        return productQuantityLocator;
    }

    //Locate the name of the selected product
    getProductName (productName: string):Locator {
        const productNameLocator = this.page.getByRole('link', { name: productName }).filter({hasText: productName});
        return productNameLocator;
    }

    //Locate the price of the selected product
    getProductPrice (productPrice: number):Locator {
        const productPriceLocator = this.page.getByText('€ / unité').filter({hasText: productPrice.toString()});
        return productPriceLocator;
    }


    // Increase product quantity
    async increaseProductQuantity (productId: string) {
        await this.page.getByTestId('increase-quantity-${productId}')
}

    // Decrease product quantity
    async descreaseProductQuantity (productId: string) {
        await this.page.getByTestId('decrease-quantity-${productId}');
    
}

    // Remove Product
    async removeProduct (productId: string) {
        await this.page.getByTestId('remove-item-${productId}')
    
}

    // Clear Cart
    async clearCart () {
        await this.clearCartButton.click();
    
}
    // Go to Checkout
    async goToCheckout () {
        await this.checkoutButton.click();
    
}

    // Continue Shopping
    async continueShopping () {
        await this.continueShoppingButton.click();
    
}

}