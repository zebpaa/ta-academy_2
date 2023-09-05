import { DataLayer } from '@Utils/dataLayer';
import { test, expect } from '@playwright/test';
// Using Faker
import { faker } from '@faker-js/faker';

test.describe('check event in data layer after subscription', () => {
    test('check that event will be created', async ({ page }) => {
        // Going to URL, don't waiting a load
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await test.step('scroll to footer, sign up email', async () => {
            const emailInput = page.locator('//footer//input[@placeholder="Enter your Email"]');
            // Create a random email address
            const randomEmail = faker.internet.email();
            await emailInput.fill(randomEmail);

            // Create a locator of button, after - click
            const button = page.locator('//button[contains(., "Sign Up")]');
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
