import { test, expect } from "@playwright/test";

test("has correct title and content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Broccoli & Co/);
  await expect(page.getByText(/A better way to enjoy/)).toBeVisible();
  await expect(
    page.getByText("Be the first to know when we launch."),
  ).toBeVisible();
  await expect(page.getByText("Request an invite")).toBeVisible();
});

test("can be used to request an invite ", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Request an invite").click();

  // First step of form
  await page.getByLabel("Full Name").fill("John Smith");
  await page.getByLabel("Email", { exact: true }).fill("test@mail.com");
  await page.getByLabel("Confirm Email").fill("test@mail.com");

  await page.getByText("Submit").click();

  // Completed form
  await expect(page.getByText("All done!")).toBeVisible();

  await page.getByText("OK").click();

  await expect(page.getByText("A better way to enjoy")).toBeVisible();
});
