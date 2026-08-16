# Test Plan — PLP (Product Listing Page)

Objective

Quick checks to validate the Product Listing Page (PLP) loads, displays products, supports grid/list toggles, shows key sections, and that representative links work.

Preconditions

- App reachable at `process.env.URL`.
- Use Playwright fixtures and the `PLP` Page Object (`tests/pages/plp.ts`).

POM locators (from `tests/pages/plp.ts`)

- `pageTitle` — `page.getByRole('heading', { name: 'Notre Catalogue' })`
- `productsContainer` — `page.locator('div:has(> div.group)').first()` (holds product grid/list)
- `plpProduct` — `page.getByTestId('product-card-1')`
- `filtersButton` — `page.getByRole('button', { name: 'Filtres' })`
- `filterAccessoryOption` — `page.getByRole('button', { name: 'Accessoires' })`
- `filterOptionPriceUnder100` — `page.getByRole('button', { name: 'Moins de 100€' })`
- `sortCombobox` — `page.getByRole('combobox')`
- `gridDisplay` — grid toggle button (POM: `gridDisplay`)
- `listDisplay` — list toggle button (POM: `listDisplay`)
- `resetButton` — `page.getByRole('button', { name: 'Réinitialiser' })`

Steps

- 0 — Access site

  - Action: `page.goto(process.env.URL!)` and navigate to the catalog/PLP (e.g., click header/catalog link).
  - Check: navigation completes to the products listing URL (e.g., `/products` or `/catalog`).

- 1 — Access products page

  - Action: Open the PLP via site navigation or direct URL.
  - Check: `PLP.pageTitle` is visible and the page URL matches expected regex.

- 2 — Verify PLP displays without error

  - Action: Wait for a stable landmark such as `PLP.productsContainer` or `PLP.pageTitle`.
  - Checks:
    - `PLP.getAllElements()` are visible (title, product card, filters button, sort combobox, display toggles).
    - No uncaught JavaScript console errors during load.

- 3 — Grid view / List view

  - Action: Use `PLP.switchToListView()` to toggle between grid and list.
  - Checks:
    - After selecting grid, `PLP.productsContainer` has a CSS class matching `/.*grid.*/`.
    - After selecting list, `PLP.productsContainer` has a CSS class matching `/.*flex.*/`.

- 4 — Sections are present

  - Action: Verify presence of filtering and sorting UI and a visible product card.
  - Checks:
    - `PLP.filtersButton`, `PLP.sortCombobox` are visible and enabled.
    - At least one `PLP.plpProduct` is visible.

- 5 — Links are functional

  - Action: Click a representative product and verify navigation to the product page using `PLP.clickProductLinkAndCheckItWorks(plpProduct, /product|products/);`.
   - Checks:
    - After clicking a product, the page navigates to a product detail URL and shows product detail elements.

- 6 — filters are functional
  - Action: Open filters (`PLP.filtersButton`) and apply a category filter and a price filter via `PLP.filterProducts(filterAccessoryOption, filterOptionPriceUnder100)`.
  - Checks:
    - After selecting filter options, the  `PLP.resetButton` is  visible and enabled
    - After applying filters, selected filter buttons have class `/.*tech-gradient.*/` and the products list updates.

- 7 — sorts are functional
  - Action: Sort products
  - Checks:
    - After selecting sort option "Nouveautes" the product list is updated and only products with "Nouveau" tag are displayed
    - After selecting sort option "Popularite" the product list is updated and only products with "Populaire" tag are displayed
    - After selecting sort option "Prix croissants" the product list is updated and les produits sont affichées par ordre croissant de prix
    - After selecting sort option "Prix decroissants" the product list is updated and les produits sont affichées par decroissant croissant de prix



Selectors & Implementation notes

- Prefer using `PLP` POM methods in tests: `getAllElements()`, `switchToListView()`, `clickProductLinkAndCheckItWorks()`, `filterProducts()`.
- If filters or product lists are lazy-loaded, wait for `PLP.productsContainer` stability before asserting children.
- For URLs, prefer regex expectations (`/products|catalog/`, `/product\/\d+/`) to be resilient.

Example snippets (Playwright test style)

```javascript
// navigate to PLP
await page.goto(process.env.URL!);
await header.goToCatalog(); // or click header link
await expect(plp.pageTitle).toBeVisible();

// verify PLP elements
for (const el of plp.getAllElements()) await expect(el).toBeVisible();

// toggle views
await plp.switchToListView();

// click product
await plp.clickProductLinkAndCheckItWorks(plp.plpProduct, /product|products/);

// filter
await plp.filterProducts(plp.filterAccessoryOption, plp.filterOptionPriceUnder100);
```

Pass criteria

- PLP loads and main controls are visible.
- Grid/list toggles switch the layout as expected.
- Filters and sorting controls are interactive and update the product list.
- Representative product links navigate to product detail pages without JS console errors.
