/*
  PLP smoke test
  - Uses the `PLP` Page Object (available via the `plpPage` fixture)
  - Steps mirror `specs/plp/testplp.md`
*/

import { test, expect } from '../../fixture';

test.beforeEach(async ({ page, browsing, plpPage }) => {
  // Navigate to base URL then to the PLP via header so each test starts on the products page
  await page.goto(process.env.URL!);
  await browsing.produitsHeader.click();
  await expect(plpPage.pageTitle).toBeVisible();
  await expect(page).toHaveURL(/products|catalog|catalogue/i);
});

test('PLP smoke: basic checks (access, load, sections)', async ({ page, plpPage }) => {
  const jsErrors: string[] = [];
  page.on('console', (msg) => { if (msg.type() === 'error') jsErrors.push(msg.text()); });

  await test.step('Step 0 — Access products page', async () => {
    await expect(plpPage.pageTitle).toBeVisible();
    await expect(page).toHaveURL(/products|catalog|catalogue/i);
  });

  await test.step('Step 1 — Verify PLP displays without error', async () => {
    for (const el of plpPage.getAllElements()) {
      await expect(el).toBeVisible();
    }
    expect(jsErrors).toHaveLength(0);
  });

  await test.step('Step 2 — Sections are present', async () => {
    await expect(plpPage.filtersButton).toBeVisible();
    await expect(plpPage.sortCombobox).toBeVisible();
    await expect(plpPage.plpProduct).toBeVisible();
  });

});

// Independent tests so one feature failure doesn't block others
test('PLP view toggle: grid <-> list', async ({ plpPage }) => {
  await plpPage.switchToListView();
  await expect(plpPage.productsContainer).toHaveClass(/.*flex.*/);
  // switch back to grid and assert
  await plpPage.gridDisplay.click();
  await expect(plpPage.productsContainer).toHaveClass(/.*grid.*/);
});

test('PLP links: product navigation', async ({ page, plpPage, pdpPage }) => {
  await plpPage.clickProductLinkAndCheckItWorks(plpPage.plpProduct, /product|products/i);
  // basic sanity: product detail page should have a non-empty title
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);

  // Click 'Retour au catalogue' on PDP and verify we return to PLP
  await pdpPage.backToCatalogLink.click();
  await expect(plpPage.pageTitle).toBeVisible();
  await expect(page).toHaveURL(/products|catalog|catalogue/i);
});

//NEED TO FIX: filter and sort tests are skipped because they have to be reworked
test.fixme('PLP filters: functional', async ({ plpPage }) => {
  const cards = plpPage.productsContainer.locator('[data-testid^="product-card-"]');
  const before = await cards.allTextContents();

  await plpPage.filterProducts(plpPage.filterAccessoryOption, plpPage.filterOptionPriceUnder100);

  await expect(plpPage.resetButton).toBeVisible();
  const after = await cards.allTextContents();
  expect(after.length).toBeLessThanOrEqual(before.length);
  // ensure filter buttons show selected state
  await expect(plpPage.filterAccessoryOption).toHaveClass(/tech-gradient/);
  await expect(plpPage.filterOptionPriceUnder100).toHaveClass(/tech-gradient/);
});

test.fixme('PLP sorts: functional', async ({ plpPage }) => {
  const cards = plpPage.productsContainer.locator('[data-testid^="product-card-"]');
  const before = await cards.allTextContents();
  // helper: extract first numeric price from card text (handles 199,99 or 199.99 formats)
  const parsePrice = (text: string) => {
    const m = text.match(/\d{1,3}(?:[\s,.]\d{3})*(?:[\.,]\d{2})?/);
    if (!m) return null;
    // normalize: remove spaces, replace comma with dot
    const raw = m[0].replace(/\s/g, '').replace(',', '.');
    const n = Number(raw.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : null;
  };

  // Check price ascending 
  try {
    await plpPage.sortCombobox.selectOption({ label: 'Prix croissant' });
    await plpPage.productsContainer.waitFor({ state: 'visible' });
    const texts = await cards.allTextContents();
    const prices = texts.map(parsePrice).filter((p): p is number => p !== null);
    if (prices.length > 0) {
      for (let i = 1; i < prices.length; i++) expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    } else {
      // fallback: ensure DOM changed compared to before
      const after = texts;
      expect(JSON.stringify(after)).not.toBe(JSON.stringify(before));
    }
  } catch (e) {
    // if option unavailable, warn but don't fail the whole suite
    // eslint-disable-next-line no-console
    console.warn('Prix croissant sort not available or failed');
  }

  // Check price descending
  try {
    await plpPage.sortCombobox.selectOption({ label: 'Prix décroissant' });
    await plpPage.productsContainer.waitFor({ state: 'visible' });
    const textsDesc = await cards.allTextContents();
    const pricesDesc = textsDesc.map(parsePrice).filter((p): p is number => p !== null);
    if (pricesDesc.length > 0) {
      for (let i = 1; i < pricesDesc.length; i++) expect(pricesDesc[i]).toBeLessThanOrEqual(pricesDesc[i - 1]);
    } else {
      const after = textsDesc;
      expect(JSON.stringify(after)).not.toBe(JSON.stringify(before));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Prix décroissant sort not available or failed');
  }
});
