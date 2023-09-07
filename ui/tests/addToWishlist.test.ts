import { test, expect } from '@Test';

test.describe('check event in data layer after add to wishlist', () => {
    test('check that event will be created', async ({ categoryPage, dataLayer, page }) => {
        // Going to URL, don't waiting a load
        await categoryPage.open('sunglasses');

        // Wait when page`s elemenets will load
        await page.waitForTimeout(3000);

        await test.step('find and click on my pick', async () => {
            // Take 1st product with destructuring, after take myPick and click
            const [product] = await categoryPage.getProducts();
        });

        await test.step('find and click on my pick', async () => {
            // Check the myPick`s attribute exists aria-pressed="true"
            const myPick = page.locator('//div[@aria-label="myPick"]');
            await expect(myPick).toHaveAttribute('aria-pressed', 'true');
        });

        ///////////////////////////////////////////////////
        // await test.step('get event in data layer', async () => {
        //     // Init expected event
        //     const expectedEvent = {
        //         event: 'CategoryInteraction',
        //         eventCategory: 'Category - D',
        //         eventAction: 'Product',
        //         eventLabel: 'Add to Wishlist',
        //     };

        //     // Init array of event from dataLayer
        //     const [event] = await dataLayer.waitForDataLayer({
        //         event: 'CategoryInteraction',
        //         eventCategory: 'Category - D',
        //         eventAction: 'Product',
        //     });

        //     // Checking that event strictly equal to expected event
        //     expect(event).toStrictEqual(expectedEvent);

        //     // To get all events in console
        //     // console.log(await page.evaluate(() => window.dataLayer));
        // });

        // await test.step('find and click on my pick in header', async () => {
        //     await categoryPage.Header.goToWishlist();
        // });

        // Started timeout for 3 sec
        // await page.waitForTimeout(3000);

        // await test.step('find and click on my pick in header', async () => {
        //     await categoryPage.Header.goToWishlist();
        // });

        // // Created a locator of product and checked product are on the wishlist

        // const product = categoryPage.Header.Wishlist.checkProduct();
        // await expect(product).toBeVisible();

        ///////////////////////////////////////////////////
    });
});
