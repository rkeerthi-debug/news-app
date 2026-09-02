import { test, expect } from "@playwright/test";

test.describe("News List", () => {
  test("should display the news list", async ({ page }) => {
    await page.goto("/news");

    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("should display 8 news cards per page", async ({ page }) => {
    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await expect(cards).toHaveCount(8);
  });

 test("should display the next 8 news cards on page 2", async ({
  page,
}) => {
  await page.goto("/news");

  const cards = page.locator('[data-testid="news-card"]');

  // Wait for page 1 to load
  await expect(cards).toHaveCount(8);

  const firstCardPage1 = await cards.first().innerText();

  // Move slider to page 2
  const slider = page.getByRole("slider", {
    name: "Select news page",
  });

  await slider.focus();
  await slider.press("ArrowRight");

  // Confirm pagination changed
  await expect(
    page.getByText("Page 2 of 25")
  ).toBeVisible();

  // Wait until page 2 cards are actually loaded
  await expect(cards).toHaveCount(8);

  // Give React/API state transition time to complete
  await expect
    .poll(async () => {
      return await cards.first().innerText();
    })
    .not.toBe(firstCardPage1);

  const firstCardPage2 = await cards.first().innerText();

  expect(firstCardPage2).not.toBe(firstCardPage1);
});

  test("should navigate to news details when a card is clicked", async ({
    page,
  }) => {
    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    await expect(cards).toHaveCount(8);

    // Get the first article's title
    const firstCard = cards.first();

    const title = await firstCard
      .locator("h2")
      .innerText();

    // Click the first news card
    await firstCard.click();

    // Verify URL changed to the detail page
    await expect(page).toHaveURL(/\/news\/.+/);

    // Verify the detail page contains the article title
    await expect(
      page.getByRole("heading", {
        name: title,
      })
    ).toBeVisible();
  });

  test("should navigate to the next page using the Next button", async ({
    page,
  }) => {
    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    // Verify we start on page 1
    await expect(
      page.getByText("Page 1 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    // Get first article URL on page 1
    const firstCardPage1 = cards.first();

    const linkPage1 = await firstCardPage1
      .locator("a")
      .getAttribute("href");

    // Click Next
    await page.getByRole("button", {
      name: "Next page",
    }).click();

    // Verify page changed to page 2
    await expect(
      page.getByText("Page 2 of 25")
    ).toBeVisible();

    // Verify 8 cards are displayed
    await expect(cards).toHaveCount(8);

    // Get first article URL on page 2
    const firstCardPage2 = cards.first();

    const linkPage2 = await firstCardPage2
      .locator("a")
      .getAttribute("href");

    // Verify different article
    expect(linkPage2).not.toBe(linkPage1);
  });

  test("should navigate to the previous page using the Previous button", async ({
    page,
  }) => {
    await page.goto("/news");

    const cards = page.locator('[data-testid="news-card"]');

    // Move to page 2
    await page.getByRole("button", {
      name: "Next page",
    }).click();

    await expect(
      page.getByText("Page 2 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    // Get first article URL on page 2
    const firstCardPage2 = cards.first();

    const linkPage2 = await firstCardPage2
      .locator("a")
      .getAttribute("href");

    // Click Previous
    await page.getByRole("button", {
      name: "Previous page",
    }).click();

    // Verify we are back on page 1
    await expect(
      page.getByText("Page 1 of 25")
    ).toBeVisible();

    await expect(cards).toHaveCount(8);

    // Get first article URL on page 1
    const firstCardPage1 = cards.first();

    const linkPage1 = await firstCardPage1
      .locator("a")
      .getAttribute("href");

    // Verify the article changed back
    expect(linkPage1).not.toBe(linkPage2);
  });
  test("should disable the Previous button on the first page", async ({
  page,
}) => {
  await page.goto("/news");

  // Verify we are on page 1
  await expect(
    page.getByText("Page 1 of 25")
  ).toBeVisible();

  // Find the Previous button
  const previousButton = page.getByRole("button", {
    name: "Previous page",
  });

  // Verify Previous is disabled
  await expect(previousButton).toBeDisabled();
});
test("should disable the Next button on the last page", async ({ page }) => {
  await page.goto("/news");

  const slider = page.getByRole("slider", {
    name: "Select news page",
  });

  // Move directly to the last page
  await slider.focus();
  await slider.press("End");

  // Verify we are on the last page
  await expect(
    page.getByText("Page 25 of 25")
  ).toBeVisible();

  // Find the Next button
  const nextButton = page.getByRole("button", {
    name: "Next page",
  });

  // Verify Next is disabled
  await expect(nextButton).toBeDisabled();
});
test("should display loading state while news is being fetched", async ({
  page,
}) => {
  await page.goto("/news");

  // Verify loading state
  await expect(
    page.getByText("Loading news...")
  ).toBeVisible();

  // Verify loading state eventually resolves
  await expect(
    page.locator('[data-testid="news-card"]')
  ).toHaveCount(8);
});
});