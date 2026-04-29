import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as testData from '../data/testData.json';

test('login attempt using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Navigate
  await loginPage.navigate();

  // 2. Perform Action (Data comes from .env or JSON)
  await loginPage.submitLogin(
    process.env.QA_USER!, 
    process.env.QA_PASS!
  );

  // 3. Assert
  await expect(loginPage.messageBanner).toContainText('You logged into a secure area!');
});

// TEST 2: The "Data-Driven" Failure Path (Uses JSON)
test('failed login with invalid data', async ({ page }) => {
  await page.goto('/login');
  
  // Use data from our JSON file
  await page.locator('#username').fill(testData.invalidUser.username);
  await page.locator('#password').fill(testData.invalidUser.password);
  await page.getByRole('button', { name: /login/i }).click();

  // Verify the error message matches what we expect in our JSON
  await expect(page.locator('#flash')).toContainText(testData.invalidUser.expectedError);
});