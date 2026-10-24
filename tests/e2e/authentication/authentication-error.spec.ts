/*
  Adapt selectors/messages here if the application text or selectors differ:
  - Inline errors: `authenticationPage.errEmailFormat`, `authenticationPage.errPasswordFormat`
  - Toast: `page.getByRole('status')`
  - Message strings are in French as defined in the spec file.
*/

import { test, expect } from '../../fixture';
import users from '../../data/users.json'; //import du fichier


test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL!);
});

test('missing username shows email format error', async ({
    authenticationPage, browsing
}) => {

    await test.step('The user goes to the authentication page', async () => {
        //Go to the auth page from the header
        await browsing.loginHeader.click();
    });

    await test.step('The user enters a valid password and leaves the email empty', async () => {
        // Leave email empty, provide a password, submit
        await authenticationPage.connexionPasswordInput.fill(users.authentifie.password);
        await authenticationPage.loginSubmitButton.click();
    });

    await test.step('The user sees an inline email format error', async () => {
        // Assert inline email format error is visible
        await expect(authenticationPage.errEmailFormat).toBeVisible();
        await expect(authenticationPage.errEmailFormat).toContainText('Adresse email invalide');
    });
});


test('missing password shows password format error', async ({
    authenticationPage,
    browsing
}) => {

    await test.step('The user goes to the authentication page', async () => {
        //Go to the auth page from the header
        await browsing.loginHeader.click();
    });

    await test.step('The user enters a valid email and leaves the password empty', async () => {
        // Fill email, leave password empty, submit
        await authenticationPage.connexionEmailInput.fill(users.authentifie.email);
        await authenticationPage.loginSubmitButton.click();
    });

    await test.step('The user sees an inline password format error', async () => {

        // Assert inline password format error is visible
        await expect(authenticationPage.errPasswordFormat).toBeVisible();
        await expect(authenticationPage.errPasswordFormat).toContainText('Le mot de passe doit contenir');
    });
});

test('invalid credentials show connection error toast', async ({
    authenticationPage,
    browsing
}) => {

    await test.step('The user goes to the authentication page', async () => {
        //Go to the auth page from the header
        await browsing.loginHeader.click();
    });

    await test.step('The user fills in incorrect credentials and submits', async () => {
        // Fill incorrect credentials and submit
        await authenticationPage.connexionEmailInput.fill('wrong@example.com');
        await authenticationPage.connexionPasswordInput.fill('incorrectPassword');
        await authenticationPage.loginSubmitButton.click();
    });

    await test.step('The user sees a toast/pop-up with connection error messages', async () => {
        // Assert toast/pop-up with expected French messages
        // Target the visible toast container (Radix toast uses `li[role="status"][data-state="open"]`)
        await expect(authenticationPage.toastError).toBeVisible();
        await expect(authenticationPage.toastError).toContainText('Erreur de connexion');
        await expect(authenticationPage.toastError).toContainText('Email ou mot de passe incorrect');
    });
});
