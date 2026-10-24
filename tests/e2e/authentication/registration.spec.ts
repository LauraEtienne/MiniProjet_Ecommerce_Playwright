import { test, expect } from '../../fixture';
import {faker} from '@faker-js/faker';


test.beforeEach(async ({ page }) => {
        await page.goto(process.env.URL!);

});

test('registration', async ({ page, browsing, authenticationPage: authentificationPage, accountPage  }) => {
  const fakeUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };


  //Go to the auth page from the header
  await browsing.loginHeader.click();

  //Click on the Sign Up Button
  await authentificationPage.signUpTab.click();
  //Fill out and submit the registration form
  await authentificationPage.submitInscriptionForm(fakeUser.name, fakeUser.email, fakeUser.password, fakeUser.password);
  //Wait for redirection to the home page
  await page.waitForURL(process.env.URL!);  
  //Verify that your registration has been processed by checking "My Account"
  await browsing.clickMyAccountAfterAuthentication();
  //Click on "Profile"
  await accountPage.profileTab.click();
  //Please wait for the data to load
  await expect (accountPage.personalDataTitle).toBeVisible();

  //Verify that the entered data is displayed
  await page.reload(); //Reload the page because the name isn't displayed immediately after creation
  await expect (accountPage.fullNameValue).toContainText(fakeUser.name);
  await expect (accountPage.emailValue).toContainText(fakeUser.email, {ignoreCase:true});

  //Delete the account
  //Click Settings
  //await accountPage.tabSettings.click(); 
  //Click Delete Account -- DELETE ACCOUNT IS NOT IMPLEMENTED
  //await accountPage.btnDeleteAccount.click();
})
