/*
  Homepage smoke test
  - Uses the `Home` Page Object (available via the `homePage` fixture)
  - Lightweight checks: load, sections visibility, representative link navigation
*/

import { test, expect } from '../fixture';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL!);
});

test('homepage smoke: load, sections, links', async ({ page, homePage }) => {
  // Collect any uncaught JavaScript errors emitted to the page console.
  // We capture these so the test can assert that no runtime errors occurred
  // while loading and interacting with the homepage. This catches client-side
  // exceptions that might not fail network requests but indicate regressions.
  const jsErrors: string[] = [];

  // Listen to page console events and record only `error`-type messages.
  // `page.on('console')` receives all console methods (log, warn, error, etc.).
  // By pushing `msg.text()` into `jsErrors`, we can assert later that the
  // array is empty, failing the test if any console errors were produced.
  page.on('console', (msg) => {
    if (msg.type() === 'error') jsErrors.push(msg.text());
  });

  await test.step('Step 0 — Access site', async () => {
    await expect(page).toHaveURL(process.env.URL!);
  });

  await test.step('Step 1 — Verify homepage loads without error', async () => {
    await expect(homePage.produitsPharesSection).toBeVisible();
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(jsErrors).toHaveLength(0);
  });

  await test.step('Step 2 — Sections are present', async () => {
    const sections = homePage.getAllSections();
    for (const section of sections) {
      await expect(section).toBeVisible();
    }
  });

  await test.step('Step 3 — Links are functional (representative subset)', async () => {
    // Hero CTA
    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.decouvrirLesProduits, /products|catalog/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    // Hero About
    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.enSavoirPlus, /about|apropos|about-us/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    // Category links
    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.accessoires, /accessories|accessoires/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.maisonConnectee, /smart-home|smart|maison/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.gaming, /gaming|jeux/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.bureau, /office|bureau/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    // View all / catalogue
    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.voirTout, /products|catalog/i);
    await page.goto(process.env.URL!);
    await expect(homePage.produitsPharesSection).toBeVisible();

    await homePage.clicOnLinkAndCheckItIsFunctional(homePage.voirleCatalogue, /catalog|catalogue|products/i);
  });

});
