# PDP — Locator mapping: current → recommended

Mapping between the locators defined in
[`tests/pages/pdp.ts`](../../tests/pages/pdp.ts) (class `PDP`) and the locators
recommended after inspecting the real DOM of
`https://shop.missionplaywright.fr/product/1` (in-stock product) and
`https://shop.missionplaywright.fr/product/12` (out-of-stock product).

- **Recommended (no app change)**: usable right now, no application change.
- **Ideal (with `data-testid`)**: needs an attribute added on the app side,
  following the `product-detail-*` convention already in place.
- Status: OK · FRAGILE · BROKEN (no match / error).

All the locators below have been validated live: each resolves to exactly one
element, on an in-stock product and on an out-of-stock product.

---

## 0. Recommended structural scope (new)

No `data-testid` wraps the main product block. The "Avis clients" and "Produits
similaires" sections reuse the same structures (images, prices, ratings, `h3`).
A scope isolates the product block and removes most collisions:

```ts
// The .grid inside <main> that contains the <h1>: image column + info column.
// The Avis / Similaires sections come after, inside <section> elements.
readonly productPanel: Locator;
// ...
this.productPanel = page.locator('main').locator('div.grid')
  .filter({ has: page.getByRole('heading', { level: 1 }) });
```

Every "product info" locator below is anchored on `productPanel`.

---

## 1. Mapping table

| # | Element (`PDP`) | Current locator (`pdp.ts`) | Status | DOM reality | Recommended (no app change) | Ideal (with `data-testid`) |
|---|---|---|---|---|---|---|
| 1 | `image` | `page.locator('img.object-cover')` | FRAGILE | `img.object-cover` = **4 matches** (1 main + 3 "Produits similaires" cards). Unique hero wrapper: `div.aspect-square.rounded-3xl`. | `productPanel.getByRole('img').first()` <br>or `page.locator('div.aspect-square.rounded-3xl img')` | `getByTestId('product-detail-image')` |
| 2 | `productCategory` | `page.locator('p.text-primary.uppercase')` | FRAGILE | 1 match, but a utility-class chain. `<p class="text-sm text-primary font-medium uppercase tracking-wider mb-2">` right before the `<h1>`. | `productPanel.locator('p.text-primary.uppercase')` <br>or `page.getByRole('heading',{level:1}).locator('xpath=preceding-sibling::p[1]')` | `getByTestId('product-detail-category')` |
| 3 | `productTitle` | `page.locator('h1')` | OK | **Only one `h1`** on the whole page. | `page.getByRole('heading', { level: 1 })` | `getByTestId('product-detail-title')` |
| 4 | `productReviews` | `page.locator('div.flex.items-center.gap-3.mb-6').filter({ hasText: 'avis' })` | FRAGILE | Target text: `<span class="text-muted-foreground">4.8 (1247 avis)</span>`. The word "avis" only appears here (cards show `(823)`). Class chain is brittle. | `productPanel.getByText(/\(\d[\d\s]*avis\)/)` | `getByTestId('product-detail-rating')` |
| 5 | `productPrice` | `page.locator('div.flex.items-baseline.gap-4.mb-6').locator('span.text-4xl.font-bold')` | FRAGILE | `span.text-4xl.font-bold` = **1 match** (cards use `text-lg`). Two class levels. | `productPanel.locator('span.text-4xl.font-bold')` <br>or `productPanel.getByText(/\d+[.,]\d{2}\s*€/).first()` | `getByTestId('product-detail-price')` |
| 6 | `productDescription` | `page.locator('text-muted-foreground.mb-8')` | BROKEN | Missing leading dot → **tag** selector `<text-muted-foreground>` → **0 matches**. Real class: `p.text-muted-foreground.mb-8` (between the price block and the Features block). | `productPanel.locator('p.text-muted-foreground.mb-8')` <br>or `page.getByRole('heading',{name:'Caractéristiques'}).locator('xpath=../preceding-sibling::p[1]')` | `getByTestId('product-detail-description')` |
| 7 | `productFeatures` | `page.getByRole('heading', { name : 'Caractéristiques' })` | OK | 4 `h3` on the page (Caractéristiques + 3 card titles); the **name** disambiguates. | Unchanged: `page.getByRole('heading', { name: 'Caractéristiques' })` | `getByTestId('product-detail-features')` |
| 8 | `productStock` | `page.locator('p.text-sm.font-medium.flex.items-center.gap-2.text-primary').filter({ hasText: 'stock'})` | BROKEN | In stock: `<p class="… text-primary">En stock - Expédition sous 24h</p>` → OK. **Out of stock: `<p class="… text-destructive">Rupture de stock</p>` (no `text-primary`)** → **0 matches** on `/product/12`. | `productPanel.getByText(/en stock\|rupture de stock\|stock limité\|bient[oô]t disponible/i)` | `getByTestId('product-detail-stock')` (+ `data-status="in-stock\|out-of-stock"`) |
| 9 | `addToCartButton` | `page.getByTestId('product-detail-add-to-cart')` | OK | Optimal. **`disabled` when the product is out of stock** (`/product/12`). | Unchanged. Assert `toBeEnabled()` only for an in-stock product. | Unchanged |
| 10 | `whishListButton` | `page.getByTestId('product-detail-wishlist-button')` | OK | Optimal. | Unchanged | Unchanged |
| 11 | `shareProductButton` | `page.getByTestId('product-detail-share-button')` | OK | Optimal. | Unchanged | Unchanged |
| 12 | `productServices` | `page.locator('div.grid.grid-cols-3.gap-4.p-4.bg-muted/50.rounded-2xl')` | BROKEN | `bg-muted/50` contains an unescaped `/` → **invalid CSS selector** (Playwright throws). Content: "Livraison gratuite", "Garantie 2 ans", "Retour 30 jours". | `productPanel.getByText('Livraison gratuite')` <br>or escaped class `productPanel.locator('div.grid.grid-cols-3.p-4')` | `getByTestId('product-detail-services')` |
| 13 | `reviewsSection` | `page.getByRole('heading', { name:'Avis clients' })` | OK | `<section class="mb-20"><h2>Avis clients</h2>`. No aria-label. | `page.getByRole('heading', { name: 'Avis clients', level: 2 })` | `getByTestId('reviews-section')` |
| 14 | `similarProductsSection` | `page.getByRole('heading', { name: 'Produits similaires' })` | OK | `<section><h2>Produits similaires</h2>`. | `page.getByRole('heading', { name: 'Produits similaires', level: 2 })` | `getByTestId('similar-products-section')` |
| 15 | `backToCatalogLink` | `page.getByRole('link', { name: 'Retour au catalogue' })` | OK | The DOM exposes **`<a data-testid="product-detail-back-link" href="/products">`** — testid already available. | `page.getByTestId('product-detail-back-link')` | Unchanged |

---

## 2. Summary by status

| Status | Elements |
|---|---|
| BROKEN — must fix | `productDescription` (#6), `productStock` (#8), `productServices` (#12) |
| FRAGILE — class chain / collision | `image` (#1), `productCategory` (#2), `productReviews` (#4), `productPrice` (#5) |
| OK — minor improvement possible | `productTitle` (#3), `productFeatures` (#7), `addToCartButton` (#9), `whishListButton` (#10), `shareProductButton` (#11), `reviewsSection` (#13), `similarProductsSection` (#14), `backToCatalogLink` (#15) |

---

## 3. Revised `PDP` (recommended, no app change) — as shipped

```ts
constructor(page: Page) {
  this.page = page;

  // Scope on the product block (the .grid inside <main> that contains the h1)
  this.productPanel = page.locator('main').locator('div.grid')
    .filter({ has: page.getByRole('heading', { level: 1 }) });

  // Product info
  this.image             = this.productPanel.getByRole('img').first();
  this.productCategory   = this.productPanel.locator('p.text-primary.uppercase');
  this.productTitle      = page.getByRole('heading', { level: 1 });
  this.productReviews    = this.productPanel.getByText(/\(\d[\d\s]*avis\)/);
  this.productPrice      = this.productPanel.locator('span.text-4xl.font-bold');
  this.productDescription = this.productPanel.locator('p.text-muted-foreground.mb-8');
  this.productFeatures   = page.getByRole('heading', { name: 'Caractéristiques' });
  this.productStock      = this.productPanel.getByText(/en stock|rupture de stock|stock limité|bient[oô]t disponible/i);
  this.addToCartButton   = page.getByTestId('product-detail-add-to-cart');
  this.whishListButton   = page.getByTestId('product-detail-wishlist-button');
  this.shareProductButton = page.getByTestId('product-detail-share-button');

  // Reassurance block
  this.productServices   = this.productPanel.getByText('Livraison gratuite');

  // Sections
  this.reviewsSection        = page.getByRole('heading', { name: 'Avis clients', level: 2 });
  this.similarProductsSection = page.getByRole('heading', { name: 'Produits similaires', level: 2 });

  // Navigation — data-testid already present on the app
  this.backToCatalogLink = page.getByTestId('product-detail-back-link');
}
```

> Note: `addToCartButton` is `disabled` on an out-of-stock product. In tests,
> always `await expect(pdpPage.addToCartButton).toBeVisible()`, and
> `await expect(pdpPage.addToCartButton).toBeEnabled()` only for an in-stock
> product.

---

## 4. `data-testid` to add on the app side (ideal target)

Existing convention: `product-detail-*` (already on add-to-cart, wishlist,
share, back-link).

| Element | Proposed `data-testid` |
|---|---|
| Product block wrapper | `product-detail` |
| Image | `product-detail-image` |
| Category | `product-detail-category` |
| Name | `product-detail-title` |
| Rating / reviews summary | `product-detail-rating` |
| Price | `product-detail-price` |
| Description | `product-detail-description` |
| Features block | `product-detail-features` |
| Stock status | `product-detail-stock` (+ `data-status="in-stock" \| "out-of-stock"`) |
| Reassurance block | `product-detail-services` |
| Avis clients section | `reviews-section` |
| Produits similaires section | `similar-products-section` |
