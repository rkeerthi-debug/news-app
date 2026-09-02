import { test, expect } from "@playwright/test";

test.describe("News Detail", () => {
  test("should display the news detail page", async ({ page }) => {
    await page.goto("/news");

    const firstCard = page
      .locator('[data-testid="news-card"]')
      .first();

    const title = await firstCard
      .locator("h2")
      .innerText();

    // Open the article
    await firstCard.getByRole("link").first().click();

    // Verify URL changed to detail page
    await expect(page).toHaveURL(/\/news\/.+/);

    // Verify article title
    await expect(
      page.getByRole("heading", {
        name: title,
      })
    ).toBeVisible();
  });

  test("should display article information", async ({ page }) => {
    await page.goto("/news");

    const firstCard = page
      .locator('[data-testid="news-card"]')
      .first();

    // Get article information from the card
    const title = await firstCard
      .locator("h2")
      .innerText();

    const category = await firstCard
      .locator(".news-card__category")
      .innerText();

    const author = await firstCard
      .locator(".news-card__meta")
      .innerText();

    // Open article
    await firstCard.getByRole("link").first().click();

    // Verify detail page URL
    await expect(page).toHaveURL(/\/news\/.+/);

    // Verify title
    await expect(
      page.getByRole("heading", {
        name: title,
      })
    ).toBeVisible();

    // Scope assertions to the detail article
    const detailArticle = page.locator(".news-detail__article");

    // Verify category
   await expect(
  detailArticle.locator(".news-detail__category")
).toHaveText(category, {
  ignoreCase: true,
});

    // Verify author
    const authorName = author
      .replace(/^By\s*/, "")
      .split(" · ")[0];

    await expect(
      detailArticle.locator(".news-detail__meta")
    ).toContainText(authorName);
  });

  test("should show not found state for an invalid news article", async ({
    page,
  }) => {
    await page.goto("/news/invalid-news-id");

    // Verify not found state
    await expect(
      page.getByRole("heading", {
        name: "News Not Found",
      })
    ).toBeVisible();

    // Verify explanatory message
    await expect(
      page.getByText(
        "The article you're looking for doesn't exist."
      )
    ).toBeVisible();

    // Verify return link
    await expect(
      page.getByRole("link", {
        name: "Return to News",
      })
    ).toBeVisible();
  });
  test("should display the article image when an image is available", async ({
  page,
}) => {
  await page.goto("/news");

  // Find the first news card that contains an image
  const cardWithImage = page
    .locator('[data-testid="news-card"]')
    .filter({
      has: page.locator("img"),
    })
    .first();

  await expect(cardWithImage).toBeVisible();

  // Open the article
  await cardWithImage.getByRole("link").first().click();

  // Verify detail page image is displayed
  await expect(
    page.locator(".news-detail__image")
  ).toBeVisible();
});
test("should display image placeholder when an image is not available", async ({
  page,
}) => {
  await page.goto("/news");

  // Find the first news card without an image
  const cardWithoutImage = page
    .locator('[data-testid="news-card"]')
    .filter({
      hasNot: page.locator("img"),
    })
    .first();

  await expect(cardWithoutImage).toBeVisible();

  // Open the article
  await cardWithoutImage.getByRole("link").first().click();

  // Verify placeholder is displayed on detail page
  const placeholder = page.getByRole("img", {
    name: "No image available",
  });

  await expect(placeholder).toBeVisible();

  await expect(
    page.getByText("No image available")
  ).toBeVisible();
});
});