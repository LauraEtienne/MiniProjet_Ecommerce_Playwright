import { test, expect } from './fixture';
import users from '../tests/data/users.json'; //import du fichier

test.beforeEach(async ({ page }) => {
        await page.goto('https://shop.missionplaywright.fr/');
});

test('successful authentication', async ({ page, browsing, authentificationPage,accountPage }) => {
  
  //Go to the auth page from the header
  await browsing.loginHeader.click();
  
  //Fill out and submit the login form
  await authentificationPage.submitConnexionForm(users.authentifie.email,users.authentifie.password);

  //Check the home page
  //Wait for redirection to the home page
  await page.waitForURL('https://shop.missionplaywright.fr/');  

  //Go to My Account to make sure I'm logged in
  await browsing.clickMyAccountAfterAuthentication();
  //Click on "Profile"
  await accountPage.profileTab.click();
  //Please wait for the data to load
  await expect (accountPage.personalDataTitle).toBeVisible();
  //Check to see if my account information is displayed
  await expect (accountPage.fullNameValue).toContainText(users.authentifie.nom);
  await expect (accountPage.emailValue).toContainText(users.authentifie.email, {ignoreCase:true});

  //Disconnect to return to the initial state 
  await accountPage.logoutButton.click();
  //Wait for redirection to the home page
  await page.waitForURL('https://shop.missionplaywright.fr/');  
  //We make sure that the "Login" button is visible again
  await expect(browsing.loginHeader).toBeVisible();
});