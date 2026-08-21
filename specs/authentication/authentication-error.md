# Test Plan — authentication_error

Objective: Verify that the correct error messages are displayed on the login page. This spec mirrors the implemented test at `tests/authentication/authentication-error.spec.ts`.

Test cases and steps (match the test implementation):

- Case 1 — Missing username
  - Steps:
    1. From the site header click the login button (`browsing.loginHeader.click()`).
    2. Leave `page.getByTestId('login-email-input')` empty.
    3. Fill `page.getByTestId('login-password-input')` with a valid password (from `tests/data/users.json`).
    4. Click `page.getByTestId('login-submit-button')`.
  - Expected result: The inline error element located by `authenticationPage.errEmailFormat` is visible and contains "Adresse email invalide".

- Case 2 — Missing password
  - Steps:
    1. From the site header click the login button.
    2. Fill `page.getByTestId('login-email-input')` with a valid email (from `tests/data/users.json`).
    3. Leave `page.getByTestId('login-password-input')` empty.
    4. Click `page.getByTestId('login-submit-button')`.
  - Expected result: The inline error element located by `authenticationPage.errPasswordFormat` is visible and contains "Le mot de passe doit contenir".

- Case 3 — Invalid credentials
  - Steps:
    1. From the site header click the login button.
    2. Fill `page.getByTestId('login-email-input')` and `page.getByTestId('login-password-input')` with incorrect values.
    3. Click `page.getByTestId('login-submit-button')`.
  - Expected result: A visible toast container (`li[role="status"][data-state="open"]`) appears and contains the strings "Erreur de connexion" and "Email ou mot de passe incorrect".

Locators used (from `tests/pages/authentication.ts` and test implementation):
- `page.getByTestId('login-email-input')` (`authenticationPage.connexionEmailInput`)
- `page.getByTestId('login-password-input')` (`authenticationPage.connexionPasswordInput`)
- `page.getByTestId('login-submit-button')` (`authenticationPage.loginSubmitButton`)
- Inline error locators: `authenticationPage.errEmailFormat`, `authenticationPage.errPasswordFormat`
- Toast container (used in test): `li[role="status"][data-state="open"]` (scoped with `hasText('Erreur de connexion')`)

Toast / pop-up verification (code snippet used in test)
```javascript
// Target the visible toast container (Radix toast)
const toast = page.locator('li[role="status"][data-state="open"]', { hasText: 'Erreur de connexion' });
await expect(toast).toBeVisible();
await expect(toast).toContainText('Erreur de connexion');
await expect(toast).toContainText('Email ou mot de passe incorrect');
```

Notes:
- The test uses `users` fixture (`tests/data/users.json`) and `process.env.EMAIL` for credentials where applicable.
- Navigation to the login page is performed via `browsing.loginHeader.click()` (the fixture exposes the `browsing` POM).
- `await page.goto('/login')` is not used in the test; instead the header navigation is the implemented flow.
- If UI implementation changes (different toast markup or error messages), update the selectors and expected strings accordingly in both spec and test.

Test file:
```
tests/authentication/authentication-error.spec.ts
```

Run command:
```bash
npx playwright test tests/authentication/authentication-error.spec.ts -c playwright.config.ts
```
