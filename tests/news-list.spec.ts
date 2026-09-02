import { test, expect } from "@playwright/test";

test.describe("News List", () => {

  // Verify that the news list page loads successfully.
  test("should display the news list", async ({ page }) => {

    await page.goto("/news");

    await expect(page.locator("h1").first()).toBeVisible();

  });


  // Verify that exactly 8 news articles are displayed on each page.
  test("should display 8 news cards per page", async ({ page }) => {

    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await expect(cards).toHaveCount(8);

  });


  // Verify that moving the slider to page 2 loads a different set of articles.
  test("should display the next 8 news cards on page 2", async ({ page }) => {

    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await expect(cards).toHaveCount(8);

    const firstCardPage1 = await cards.first().innerText();

    const slider = page.getByRole("slider", {
      name: "Select news page",
    });

    await slider.focus();
    await slider.press("ArrowRight");

    await expect(
      page.getByText("Page 2 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    await expect
      .poll(async () => {
        return await cards.first().innerText();
      })
      .not.toBe(firstCardPage1);

    const firstCardPage2 = await cards.first().innerText();

    expect(firstCardPage2).not.toBe(firstCardPage1);

  });


  // Verify that selecting a news card navigates to its detail page.
  test("should navigate to news details when a card is clicked", async ({
    page,
  }) => {

    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await expect(cards).toHaveCount(8);

    const firstCard = cards.first();

    const title = await firstCard
      .locator("h2")
      .innerText();

    await firstCard.click();

    await expect(page).toHaveURL(/\/news\/.+/);

    await expect(
      page.getByRole("heading", {
        name: title,
      })
    ).toBeVisible();

  });


  // Verify that the Next button moves the user from page 1 to page 2.
  test("should navigate to the next page using the Next button", async ({
    page,
  }) => {

    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await expect(
      page.getByText("Page 1 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    const firstCardPage1 = cards.first();

    const linkPage1 = await firstCardPage1
      .locator("a")
      .getAttribute("href");

    await page.getByRole("button", {
      name: "Next page",
    }).click();

    await expect(
      page.getByText("Page 2 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    const firstCardPage2 = cards.first();

    const linkPage2 = await firstCardPage2
      .locator("a")
      .getAttribute("href");

    expect(linkPage2).not.toBe(linkPage1);

  });


  // Verify that the Previous button returns the user from page 2 to page 1.
  test("should navigate to the previous page using the Previous button", async ({
    page,
  }) => {

    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await page.getByRole("button", {
      name: "Next page",
    }).click();

    await expect(
      page.getByText("Page 2 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    const firstCardPage2 = cards.first();

    const linkPage2 = await firstCardPage2
      .locator("a")
      .getAttribute("href");

    await page.getByRole("button", {
      name: "Previous page",
    }).click();

    await expect(
      page.getByText("Page 1 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    const firstCardPage1 = cards.first();

    const linkPage1 = await firstCardPage1
      .locator("a")
      .getAttribute("href");

    expect(linkPage1).not.toBe(linkPage2);

  });


  // Verify that Previous is disabled when the user is on the first page.
  test("should disable the Previous button on the first page", async ({
    page,
  }) => {

    await page.goto("/news");

    await expect(
      page.getByText("Page 1 of 25")
    ).toBeVisible();

    const previousButton = page.getByRole("button", {
      name: "Previous page",
    });

    await expect(previousButton).toBeDisabled();

  });


  // Verify that Next is disabled when the user reaches the last page.
  test("should disable the Next button on the last page", async ({ page }) => {

    await page.goto("/news");

    const slider = page.getByRole("slider", {
      name: "Select news page",
    });

    await slider.focus();
    await slider.press("End");

    await expect(
      page.getByText("Page 25 of 25")
    ).toBeVisible();

    const nextButton = page.getByRole("button", {
      name: "Next page",
    });

    await expect(nextButton).toBeDisabled();

  });


  // Verify that a loading message is shown while news data is being fetched.
  test("should display loading state while news is being fetched", async ({
    page,
  }) => {

    await page.goto("/news");

    await expect(
      page.getByText("Loading news...")
    ).toBeVisible();

    await expect(
      page.locator('[data-testid="news-card"]')
    ).toHaveCount(8);

  });

});