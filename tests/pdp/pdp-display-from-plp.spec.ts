/*
  PDP display test — reached from the PLP
  - spec: specs/pdp/testpdp.md
  - seed: tests/seed.spec.ts
  - Uses the `PLP` / `PDP` Page Objects (fixtures `plpPage`, `pdpPage`) and the
    `browsing` POM for header navigation.
  - Each step owns its assertions once (no cross-step re-checks):
    0-   Reach the product page from the PLP
    1-   The PDP renders without error (load gate)
    1-1  The sections are present and populated: Avis clients, Produits similaires
    1-2  The product information is present and has sensible content
    2-   Back to catalog returns to the PLP
*/

import { test, expect } from '../fixture';

test.describe('PDP - access from the PLP', () => {
  test.beforeEach(async ({ page, browsing, plpPage }) => {
    // Navigate to the base URL, then to the PLP via the header so each test starts on the products page
    await page.goto(process.env.URL!);
    await browsing.produitsHeader.click();
    await expect(plpPage.pageTitle).toBeVisible();
    await expect(page).toHaveURL(/products|catalog|catalogue/i);
  });

  test('The PDP displays correctly with all its sections and information', async ({ page, plpPage, pdpPage }) => {
    const jsErrors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') jsErrors.push(msg.text()); });

    // 0- Reach the product page from the PLP
    await test.step('Step 0 — Reach the PDP from the PLP', async () => {
      await expect(plpPage.plpProduct).toBeVisible();
      // Capture the product name shown on the PLP card, to check we land on the right product
      const expectedName = (await plpPage.plpProduct.getByRole('heading', { level: 3 }).textContent())?.trim();
      expect(expectedName, 'PLP card should expose a product name').toBeTruthy();

      await plpPage.clickProductLinkAndCheckItWorks(plpPage.plpProduct, /\/product\/\d+/);

      // We left the PLP and landed on the matching PDP
      await expect(plpPage.pageTitle).toBeHidden();
      await expect(pdpPage.productTitle).toHaveText(expectedName!);
      expect(await page.title()).not.toEqual('');
    });

    // 1- The PDP renders without error (load gate only — element visibility is owned by 1-1 / 1-2)
    await test.step('Step 1 — The PDP renders without error', async () => {
      await expect(pdpPage.productTitle).toBeVisible();
      expect(jsErrors, `console errors: ${jsErrors.join(' | ')}`).toHaveLength(0);
    });

    // 1-1 The sections are present and populated: Avis clients, Produits similaires
    await test.step('Step 1-1 — Sections are present and populated', async () => {
      for (const section of pdpPage.getSectionElements()) {
        await expect(section).toBeVisible();
      }
      // "Avis clients" holds at least one review
      await expect(pdpPage.reviewItems.first()).toBeVisible();
      expect(await pdpPage.reviewItems.count()).toBeGreaterThan(0);
      // "Produits similaires" holds at least one product card, each linking to a PDP
      expect(await pdpPage.similarProductCards.count()).toBeGreaterThan(0);
      await expect(pdpPage.similarProductCards.first()).toHaveAttribute('href', /\/product\/\d+/);
    });

    // 1-2 The product information is present and has sensible content:
    // image, category, name, reviews, price, description, features, stock status, cta, favourite, share
    await test.step('Step 1-2 — Product information is present with sensible content', async () => {
      for (const el of pdpPage.getProductInfoElements()) {
        await expect(el).toBeVisible();
      }
      await expect(pdpPage.productServices).toBeVisible();

      await expect(pdpPage.productCategory).not.toBeEmpty();
      await expect(pdpPage.productPrice).toContainText(/\d+([.,]\d{2})?\s*€/);
      await expect(pdpPage.productReviews).toContainText(/\d+\s*avis/);
      await expect(pdpPage.productDescription).not.toBeEmpty();
      expect(await pdpPage.featureItems.count()).toBeGreaterThan(0);
      await expect(pdpPage.productStock).toContainText(/en stock|rupture de stock|stock limité|bient[oô]t disponible/i);
      // Entry product (product-card-1) is in stock -> the CTA is actionable; favourite/share always actionable
      await expect(pdpPage.addToCartButton).toBeEnabled();
      await expect(pdpPage.whishListButton).toBeEnabled();
      await expect(pdpPage.shareProductButton).toBeEnabled();
    });

    // 2- Back to the catalog (optional flow from the plan)
    await test.step('Step 2 — Back to catalog returns to the PLP', async () => {
      await pdpPage.backToCatalogLink.click();
      await expect(plpPage.pageTitle).toBeVisible();
      await expect(page).toHaveURL(/products|catalog|catalogue/i);
    });
  });
});
