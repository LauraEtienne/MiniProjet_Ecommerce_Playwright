/*
  Contact page E2E tests
  - Uses the `Contact` Page Object (available via the `contactPage` fixture)
  - Navigation via the site header (`browsing` fixture)
  - Scenarios mirror `specs/scenarios_playwright_claude.xlsx` (Id 9, 10, 11)
    and the review notes in `specs/contact/contact-locators-review.md`
*/

import { test, expect } from '../fixture';

test.beforeEach(async ({ page, browsing, contactPage }) => {
  // Start on the base URL then reach the Contact page through the header,
  // so every test begins on a freshly loaded Contact page.
  await page.goto(process.env.URL!);
  await browsing.contactHeader.click();
  await expect(contactPage.pageTitle).toBeVisible();
  await expect(page).toHaveURL(/contact/);
});

test.describe('Contact Page', () => {

  test('should display contact page elements properly', async ({ page, contactPage }) => {
    const jsErrors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') jsErrors.push(msg.text()); });

    await test.step('Step 0 — The Contact page is displayed', async () => {
      await expect(contactPage.pageTitle).toBeVisible();
      await expect(page).toHaveURL(/contact/);
    });

    await test.step('Step 1-1 — Content is the expected one', async () => {
      // Section headings + information blocks
      for (const el of contactPage.getAllSectionsandInfo()) {
        await expect(el).toBeVisible();
      }
      // "Envoyez-nous un message" form
      await expect(contactPage.fullNameTextbox).toBeVisible();
      await expect(contactPage.emailTextbox).toBeVisible();
      await expect(contactPage.subjectTextbox).toBeVisible();
      await expect(contactPage.messageTextbox).toBeVisible();
      await expect(contactPage.sendMessageButton).toBeVisible();
      // FAQ questions
      await expect(contactPage.delayQuestion).toBeVisible();
      await expect(contactPage.productReturnQuestion).toBeVisible();
      await expect(contactPage.warrantyQuestion).toBeVisible();
      await expect(contactPage.paymentQuestion).toBeVisible();

      expect(jsErrors).toHaveLength(0);
    });

    await test.step('Step 1-2 — Links are functional (mailto / tel targets)', async () => {
      await expect(contactPage.emailLink).toBeVisible();
      await expect(contactPage.emailLink).toHaveAttribute('href', 'mailto:contact@techhub.fr');
      await expect(contactPage.phoneLink).toBeVisible();
      await expect(contactPage.phoneLink).toHaveAttribute('href', 'tel:+33123456789');
    });
  });

  test('should send message successfully with valid inputs', async ({ contactPage }) => {
    const fullName = `${process.env.FIRSTNAME ?? 'John'} ${process.env.LASTNAME ?? 'Dupont'}`;
    const email = process.env.EMAIL ?? 'john.dupont@test.com';
    const subject = 'Question sur ma commande';
    const message = 'Bonjour, je souhaite avoir des informations sur le suivi de ma commande. Merci.';

    await test.step('Step 0 — The Contact page is displayed with its content', async () => {
      await expect(contactPage.sendMessageSection).toBeVisible();
    });

    await test.step('Step 1 — Sending a message works', async () => {
      await contactPage.sendMessage(fullName, email, subject, message);

      // Success toast (Radix), same notification mechanism as the auth error spec
      await expect(contactPage.messageSentToast).toBeVisible();

      // The form is reset after a successful submission
      await expect(contactPage.fullNameTextbox).toHaveValue('');
      await expect(contactPage.emailTextbox).toHaveValue('');
      await expect(contactPage.subjectTextbox).toHaveValue('');
      await expect(contactPage.messageTextbox).toHaveValue('');
    });
  });

});

test.describe('FAQ Section', () => {

  test('should expand and collapse FAQ items correctly', async ({ contactPage }) => {
    const items = [
      { question: contactPage.delayQuestion, answer: contactPage.delayAnswer },
      { question: contactPage.productReturnQuestion, answer: contactPage.productReturnAnswer },
      { question: contactPage.warrantyQuestion, answer: contactPage.warrantyAnswer },
      { question: contactPage.paymentQuestion, answer: contactPage.paymentAnswer },
    ];

    await test.step('Step 0 — The Contact page is displayed with its content', async () => {
      await expect(contactPage.questionsSection).toBeVisible();
    });

    await test.step('Step 1 — The FAQ section is functional (expand / collapse)', async () => {
      for (const { question, answer } of items) {
        await expect(question).toBeVisible();
        // Closed by default: the answer paragraph is not in the DOM
        await expect(answer).toBeHidden();
        // Expand
        await contactPage.toggleFAQ(question);
        await expect(answer).toBeVisible();
        // Collapse
        await contactPage.toggleFAQ(question);
        await expect(answer).toBeHidden();
      }
    });
  });

});
