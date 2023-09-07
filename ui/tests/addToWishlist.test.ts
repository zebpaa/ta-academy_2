import { test, expect } from '@Test';

test.describe('check event in data layer after add to wishlist', () => {
    test('check that event will be created', async ({ categoryPage, dataLayer }) => {
        // Going to URL, don't waiting a load
        await categoryPage.open('sunglasses');

        await test.step('find and click on my pick', async () => {
            // Take 1st product and click myPick
            const myPick = await categoryPage.Product.clickMyPick();

            // Check the myPick`s attribute exists aria-pressed="true"
            await expect(myPick).toHaveAttribute('aria-pressed', 'true');
        });

        await test.step('get event in data layer', async () => {
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
        });

        await test.step('find and click on wishlist in header', async () => {
            await categoryPage.Header.goToWishlist();
        });

        // Created a locator of product and checked product are on the wishlist
        const product = categoryPage.Header.Wishlist.checkProduct();
        await expect(product).toBeVisible();
    });
});
