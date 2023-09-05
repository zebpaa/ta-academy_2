import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check event in data layer after add to wishlist', () => {
    test('check that event will be created', async ({ page }) => {
        // Going to URL, don't waiting a load
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        // Create a locator of sunglasses and after - click
        const sunglasses = page.locator('//nav//li[contains(., "Sunglasses")]');
        await sunglasses.click();

        // Wait when page`s elemenets will load
        await page.waitForTimeout(3000);

        await test.step('find and click on my pick', async () => {
            // Take 1st product with destructuring, after take myPick and click
            const [product] = await page.locator('[data-test-name="product"]').all();
            const myPick = product.locator('//div[@aria-label="myPick"]');
            await myPick.click();

            // Check the myPick`s attribute exists aria-pressed="true"
            await expect(myPick).toHaveAttribute('aria-pressed', 'true');
        });

        // Init dataLayer
        const dataLayer = new DataLayer(page);
        // Init expected event
        const expectedEvent = {
            event: 'CategoryInteraction',
            eventCategory: 'Category - D',
            eventAction: 'Product',
            eventLabel: 'Add to Wishlist',
        };
        // Init array of event from dataLayer
        const [event] = await dataLayer.waitForDataLayer({
            event: 'CategoryInteraction',
            eventCategory: 'Category - D',
            eventAction: 'Product',
        });

        // Checking that event strictly equal to expected event
        expect(event).toStrictEqual(expectedEvent);

        // To get all events in console
        console.log(await page.evaluate(() => window.dataLayer));

        await test.step('find and click on my pick in header', async () => {
            const myPickHeader = page.locator('//div[@aria-label="View My Picks"]');
            await myPickHeader.click();
        });

        // Started timeout for 3 sec
        await page.waitForTimeout(3000);

        // Created a locator of product and checked product are on the wishlist
        const product = page.locator('//li[@data-test-name="itemMyPicks"]');
        await expect(product).toBeVisible();
    });
});
