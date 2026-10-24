# Test Plan — PDP (Product Detail Page) reached from the PLP

## Objective

Verify that, starting from the Product Listing Page (PLP), the user reaches the
Product Detail Page (PDP) of a product, that the page loads without error, and
that every expected section and product information is displayed.

## Preconditions

- Application reachable at `process.env.URL`.
- Tests written with the project's Playwright fixtures (`tests/fixture.ts`).
- Page Objects used:
  - `plpPage` → `tests/pages/plp.ts` (class `PLP`)
  - `pdpPage` → `tests/pages/pdp.ts` (class `PDP`)
  - `browsing` → `tests/pages/browsing.ts` (class `Browsing`, header navigation)
- Starting state: fresh session, unauthenticated user (no step in this scenario
  requires authentication).

## Fixtures & Page Objects involved

| Fixture / POM | Element | Locator (POM source) | Use in the scenario |
|---|---|---|---|
| `browsing` | `produitsHeader` | `getByTestId('nav-link-products')` | Go to the PLP from the header |
| `plpPage` | `pageTitle` | `getByRole('heading', { name: 'Notre Catalogue' })` | Confirm the PLP is loaded |
| `plpPage` | `plpProduct` | `getByTestId('product-card-1')` | Product clicked to open the PDP |
| `plpPage` | `clickProductLinkAndCheckItWorks(product, expectedURL)` | — | Product click + URL assertion |
| `pdpPage` | `productPanel` | `main` `.grid` filtered by the level-1 heading | Scope for every product-info locator |
| `pdpPage` | `image` | `productPanel.getByRole('img').first()` | Product image (1-2) |
| `pdpPage` | `productCategory` | `productPanel.locator('p.text-primary.uppercase')` | Category (1-2) |
| `pdpPage` | `productTitle` | `getByRole('heading', { level: 1 })` | Product name (1-2) |
| `pdpPage` | `productReviews` | `productPanel.getByText(/\(\d[\d\s]*avis\)/)` | Rating / reviews summary (1-2) |
| `pdpPage` | `productPrice` | `productPanel.locator('span.text-4xl.font-bold')` | Price (1-2) |
| `pdpPage` | `productDescription` | `productPanel.locator('p.text-muted-foreground.mb-8')` | Description (1-2) |
| `pdpPage` | `productFeatures` | `getByRole('heading', { name: 'Caractéristiques' })` | Features (1-2) |
| `pdpPage` | `productStock` | `productPanel.getByText(/en stock\|rupture de stock\|.../i)` | Stock status (1-2) |
| `pdpPage` | `addToCartButton` | `getByTestId('product-detail-add-to-cart')` | CTA (1-2) |
| `pdpPage` | `whishListButton` | `getByTestId('product-detail-wishlist-button')` | Wishlist / favourite (1-2) |
| `pdpPage` | `shareProductButton` | `getByTestId('product-detail-share-button')` | Share (1-2) |
| `pdpPage` | `productServices` | `productPanel.getByText('Livraison gratuite')` | Reassurance block |
| `pdpPage` | `reviewsSection` | `getByRole('heading', { name: 'Avis clients', level: 2 })` | "Avis clients" section (1-1) |
| `pdpPage` | `similarProductsSection` | `getByRole('heading', { name: 'Produits similaires', level: 2 })` | "Produits similaires" section (1-1) |
| `pdpPage` | `getProductInfoElements()` | — | The 11 product-info items (1-2) |
| `pdpPage` | `getSectionElements()` | — | The 2 sections (1-1) |
| `pdpPage` | `getAllElements()` | — | Full visibility loop (1) |
| `pdpPage` | `backToCatalogLink` | `getByTestId('product-detail-back-link')` | (optional) back to PLP |

## Scope

- **In scope**: PLP → PDP navigation, load without JS error, presence of the
  sections (Avis clients, Produits similaires), presence of the product
  information (image, category, name, reviews, price, description, features,
  stock status, CTA, favourite, share).
- **Out of scope**: functional behaviour of the actions (real add-to-cart, real
  wishlist add, opening the share dialog), review contents, navigation to a
  similar product, responsive layout, i18n.

---

## Scenario — Reach the PDP from the PLP and display it correctly

**Suite (describe)**: `PDP - access from the PLP`
**Test**: `The PDP displays correctly with all its sections and information`
**Seed**: `tests/seed.spec.ts`
**Target file**: `tests/pdp/pdp-display-from-plp.spec.ts`

### Test preconditions (beforeEach)

1. `await page.goto(process.env.URL!)`.
2. `await browsing.produitsHeader.click()`.
3. `await expect(plpPage.pageTitle).toBeVisible()`.
4. `await expect(page).toHaveURL(/products|catalog|catalogue/i)`.
5. Set up console error capture:
   `page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); })`.

> Each step owns its assertions once — Step 1 is only a load gate; element
> visibility is asserted in Step 1-1 (sections) and Step 1-2 (product info).

### Step 0 — Reach the product page from the PLP

- **Action**:
  - `await expect(plpPage.plpProduct).toBeVisible()`
  - Read the product name from the PLP card (`plpProduct` level-3 heading).
  - `await plpPage.clickProductLinkAndCheckItWorks(plpPage.plpProduct, /\/product\/\d+/)`
- **Expected result**:
  - The URL matches a product page (`/product/<id>`).
  - The PLP title (`plpPage.pageTitle`) is no longer visible.
  - `pdpPage.productTitle` has the exact name read from the PLP card (landed on
    the right product).
  - `page.title()` is not empty.

### Step 1 — The PDP renders without error (load gate)

- **Action**:
  - `await expect(pdpPage.productTitle).toBeVisible()`.
  - `expect(jsErrors).toHaveLength(0)`.
- **Expected result**:
  - The PDP is loaded and no unhandled JavaScript error was emitted.

#### Step 1-1 — The sections are present and populated

- **Action / Checks**:
  - `await expect(pdpPage.reviewsSection).toBeVisible()` — **Avis clients** section.
  - `await expect(pdpPage.similarProductsSection).toBeVisible()` — **Produits similaires** section.
  - `pdpPage.reviewItems` has at least one visible entry.
  - `pdpPage.similarProductCards` has at least one card, and the first links to
    a `/product/<id>` URL.

#### Step 1-2 — The product information is present with sensible content

Assert `toBeVisible()` for each product information item, then a content check:

| # | Information | POM element | Content check |
|---|---|---|---|
| 1 | Image | `pdpPage.image` | visible |
| 2 | Category | `pdpPage.productCategory` | not empty |
| 3 | Name | `pdpPage.productTitle` | visible |
| 4 | Reviews (rating / summary) | `pdpPage.productReviews` | contains `/\d+\s*avis/` |
| 5 | Price | `pdpPage.productPrice` | contains `/\d+([.,]\d{2})?\s*€/` |
| 6 | Description | `pdpPage.productDescription` | not empty |
| 7 | Features | `pdpPage.productFeatures` | `pdpPage.featureItems` count > 0 |
| 8 | Stock status | `pdpPage.productStock` | contains a known status text |
| 9 | CTA (add to cart) | `pdpPage.addToCartButton` | `toBeEnabled()` (entry product is in stock) |
| 10 | Favourite | `pdpPage.whishListButton` | `toBeEnabled()` |
| 11 | Share | `pdpPage.shareProductButton` | `toBeEnabled()` |

- Also assert `pdpPage.productServices` (reassurance block) is visible.
- **Expected result**: all 11 items are visible and carry sensible content.

### Step 2 (optional) — Back to catalog

- **Action**: `await pdpPage.backToCatalogLink.click()`.
- **Expected result**: `plpPage.pageTitle` becomes visible again and the URL
  matches `/products|catalog|catalogue/i`.

---

## Pass criteria

- Clicking a PLP product opens the matching PDP (same product name, product URL).
- The PDP loads with no JavaScript console error.
- The **Avis clients** and **Produits similaires** sections are present and
  populated (≥ 1 review, ≥ 1 similar-product card).
- The 11 product-info items listed in 1-2 are visible and carry sensible content.

## Fail criteria

- Navigation stays on the PLP or lands on a 404 / error page.
- A JavaScript error is emitted during load.
- An expected section or product-info item is missing or hidden.

---

## Implementation notes

- Prefer POM methods (`plpPage.clickProductLinkAndCheckItWorks`,
  `pdpPage.getProductInfoElements` / `getSectionElements`) over inline locators.
- For URLs, use lenient regexes (`/product|products/i`, `/\/product\/\d+/`) as
  in `tests/plp/plp.spec.ts`.
- Split the checks with `test.step(...)` (0, 1, 1-1, 1-2, 2) for a readable
  report. Each step owns its assertions once — no cross-step re-checks.
- `pdpPage.getAllElements()` (product info + services + sections) is kept in the
  POM as a one-shot smoke helper, but this spec does not use it: visibility is
  asserted in 1-1 / 1-2 so the report maps 1:1 to the plan.
- `pdpPage.getAllElements()` does **not** include `backToCatalogLink` → step 2
  references the element directly.
- The DOM was inspected on `https://shop.missionplaywright.fr/product/1`
  (in stock) and `/product/12` (out of stock). All POM locators resolve to
  exactly one element in both states. Detailed old→new mapping and the three
  fixed locator bugs are documented in `specs/pdp/pdp-locators-mapping.md`.
- `productStock` is text-based so it matches every stock state ("En stock…",
  "Rupture de stock").
- `addToCartButton` is `disabled` on an out-of-stock product — assert
  `toBeEnabled()` only for an in-stock product.

## Run command (once the script is generated)

```bash
npx playwright test tests/pdp/pdp-display-from-plp.spec.ts -c playwright.config.ts
```
