# Test Plan — Homepage Smoke

Objective

Quick smoke checks to ensure the homepage loads, main sections are present, and a representative subset of links navigate correctly.

Preconditions

- App reachable at `process.env.URL`.
- Use Playwright fixtures and the `Home` Page Object (`tests/pages/home.ts`).

Test steps (match `tests/homepage/homepage.spec.ts`)

- 0 — Access site
  - Action: `page.goto(process.env.URL!)` (performed in test `beforeEach`).
  - Check: page finishes navigation to the base URL.

- 1 — Verify homepage loads without error
  - Action: Wait for a stable landmark (`Home.produitsPharesSection`).
  - Checks:
    - `Home.produitsPharesSection` is visible.
    - Page title is non-empty.
    - No uncaught JS console errors were emitted during load (test captures `console.error`).

- 2 — Sections are present
  - Action: Use `Home.getAllSections()` and assert visibility for each section.
  - POM locators (exact names from `tests/pages/home.ts`):
    - `firstSection` — `page.getByRole('heading', { name: 'Produits phares' })`
    - `explorezNosCategoriesSection` — `page.getByRole('heading', { name: 'Explorez nos catégories' })`
    - `produitsPharesSection` — `page.getByRole('heading', { name: 'Produits phares' })`
    - `pourquoiSection` — `page.getByRole('heading', { name: 'Pourquoi choisir TechHub ?' })`
    - `avisSection` — `page.getByRole('heading', { name: 'Ce que disent nos clients' })`
    - `pretAEquiperVotreQuotidienSection` — `page.getByRole('heading', { name: 'Prêt à équiper votre' })`

- 3 — Links are functional (representative subset)
  - Action: Use `Home.clicOnLinkAndCheckItIsFunctional(link, expectedURL)` with the following POM locators:
    - `decouvrirLesProduits` — `testId: hero-cta-button` → expected `/products|catalog/`
    - `enSavoirPlus` — `testId: hero-about-button` → expected `/about/` (or equivalent)
    - `accessoires` — `testId: category-link-accessories`
    - `maisonConnectee` — `testId: category-link-smart-home`
    - `gaming` — `testId: category-link-gaming`
    - `bureau` — `testId: category-link-office`
    - `voirTout` — `testId: view-all-products-button`
    - `voirleCatalogue` — `testId: cta-catalog-button`
  - Checks:
    - After each click, the test asserts `page` navigated to a URL matching the provided regex and the target page shows a key element.
    - The page does not emit JS console errors during the navigation.

Notes

- The spec now mirrors the test implementation in `tests/homepage/homepage.spec.ts` and references the exact POM properties and test ids used in `tests/pages/home.ts`.
- This is a smoke test — keep assertions lightweight and prefer representative checks rather than exhaustive verification.

Example snippet (Playwright test style)

```javascript
// navigate
await page.goto(process.env.URL!);
// check main section
await expect(homePage.produitsPharesSection).toBeVisible();
// click hero CTA and assert navigation using the POM helper
await homePage.clicOnLinkAndCheckItIsFunctional(homePage.decouvrirLesProduits, /products|catalog/);
```

Pass criteria

- Homepage loads and main sections are visible.
- Representative links navigate to expected destinations without JS console errors.
