import { test, expect } from '../fixture';
import users from '../data/users.json'; //import du fichier

test.beforeEach(async ({ page }) => {
        await page.goto(process.env.URL!);
        waitUntil: 'networkidle'
});

test('successful authentication', async ({ page, browsing, authenticationPage: authentificationPage, accountPage }) => {

  await test.step('Navigate to login page via header', async () => {
    await browsing.loginHeader.click();
  });

  await test.step('Wait for login form to be visible', async () => {
    await expect(authentificationPage.connexionEmailInput).toBeVisible();
  });

  await test.step('Submit login form with valid credentials', async () => {
    // Use env EMAIL and users fixture for password
    await authentificationPage.submitConnexionForm(process.env.EMAIL!, users.authentifie.password);
  });

  await test.step('Wait for redirection to home', async () => {
    await page.waitForURL(process.env.URL!);
  });

  await test.step('Open account and verify profile data', async () => {
    await browsing.clickMyAccountAfterAuthentication();
    await accountPage.profileTab.click();
    await expect(accountPage.personalDataTitle).toBeVisible();
    await expect(accountPage.fullNameValue).toContainText(users.authentifie.lastName);
    await expect(accountPage.emailValue).toContainText(process.env.EMAIL!, { ignoreCase: true });
  });

  await test.step('Logout and ensure login header is visible', async () => {
    await accountPage.logoutButton.click();
    await page.waitForURL(process.env.URL!);
    await expect(browsing.loginHeader).toBeVisible();
  });

});