import { DataLayer } from '@Utils/dataLayer';
import { test, expect } from '@playwright/test';

test.describe('testing case when we are fill email success', () => {
  test('check that our event will be created', async ({ page, baseURL }) => {
    // Going to URL, don't waiting a load
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await test.step('checking that we are on the home page', () => {
      const url = page.url();
      expect(url).toBe(`${baseURL}`);
    });

    await test.step('scroll to footer, sign up email', async () => {
      const emailInput = page.locator('//footer//div//input');
      // Every time you need to change the email to one that has not yet been entered (+1)
      await emailInput.fill('test15@yandex.ru');

      // Scroll to down that see success message
      await page.mouse.wheel(0, 5000);

      // Create a locator of button, after - click
      const button = page.locator('//footer//button[contains(., "Sign Up")]');
      await button.click();
    });

    // Started timeout for 5 sec
    await page.waitForTimeout(5000);

    // Init dataLayer
    const dataLayer = new DataLayer(page);
    // Init expected event
    const expectedEvent = {
      event: 'GeneralInteraction',
      eventCategory: 'Footer - D',
      eventAction: 'Newsletter Subscription',
      eventLabel: 'Success',
    };
    // Init array of event from dataLayer
    const [event] = await dataLayer.waitForDataLayer({
      event: 'GeneralInteraction',
      eventCategory: 'Footer - D',
      eventAction: 'Newsletter Subscription',
      eventLabel: 'Success',
    });

    // Checking that event strictly equal to expected event
    expect(event).toStrictEqual(expectedEvent);

    // To get all events in console
    console.log(await page.evaluate(() => window.dataLayer));
  });
});
