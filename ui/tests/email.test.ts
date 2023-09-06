import { test, expect } from '@Test';

test.describe('check event in data layer after subscription', () => {
    test('check that event will be created', async ({ homePage, dataLayer }) => {
        // Going to URL, don't waiting a load
        await homePage.open();

        await test.step('scroll to footer, sign up email', async () => {
            await homePage.Footer.fillEmail();
            await homePage.Footer.clickSignUp();
        });

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
    });
});
