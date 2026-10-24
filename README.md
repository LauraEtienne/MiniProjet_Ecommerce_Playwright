# E-commerce E2E Tests — Playwright + TypeScript

End-to-end test automation for a demo e-commerce website, built with Playwright and TypeScript.
This is a **learning project** (3 months of training, coming from manual testing) and it is still evolving.

**Application under test:** https://shop.missionplaywright.fr

## Covered scenarios

| Area | Scenarios |
|---|---|
| Authentication | Successful login; error messages for missing email, missing password and invalid credentials |
| Registration | New account creation with generated data (Faker), account data check |
| Checkout | Full order flow (E2E) |
| PLP (product list) | Smoke checks, grid/list toggle, product navigation |
| PDP (product page) | Page display from the PLP, all sections and information |

## Tech and practices

- Playwright Test + TypeScript
- Page Object Model with custom fixtures (`tests/fixture.ts`, `tests/pages/`)
- Test data kept out of the tests (`tests/data/users.json`, Faker)
- Readable tests using `test.step`
- Markdown test plans in `specs/`
- CI with GitHub Actions
- Allure report published on GitHub Pages: https://lauraetienne.github.io/MiniProjet_Ecommerce_Playwright/
- Cross-browser runs: Chromium, Firefox and WebKit
- Slack notification at the end of the CI run


## Prerequisites

- Node.js 18 or higher

## Installation

```bash
git clone https://github.com/LauraEtienne/MiniProjet_Ecommerce_Playwright.git
cd MiniProjet_Ecommerce_Playwright
npm install
npx playwright install
```

## Configuration

Environment variables are loaded from `env/.env.<ENV>` (`ENV` defaults to `local`, so `env/.env.local`).

| Variable | Description | Default |
|---|---|---|
| `URL` | Base URL of the application under test | `https://shop.missionplaywright.fr/` |
| `SLACK_WEBHOOK_URL` | Slack webhook used for CI notifications (optional locally) | none |
| `ENV` | Selects the environment file to load | `local` |

Test accounts are defined in `tests/data/users.json`.

## Running the tests

```bash
npx playwright test            # headless
npx playwright test --ui       # UI mode
npx playwright show-report     # HTML report
```

## Known limitations and next steps

This project is a work in progress. Planned improvements:

- Negative and edge cases on the checkout (empty fields, invalid card)
- Cart content assertions (product, quantity, total)
- Filters and sorting tests (currently disabled, to be rewritten with strict assertions)
- Isolated test data per run instead of shared accounts
- API, accessibility and mobile coverage