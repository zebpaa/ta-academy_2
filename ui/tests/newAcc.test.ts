import { test, expect } from '@Test';

test('check event in data layer after create account', async ({ homePage, dataLayer }) => {
    // Going to URL, don't waiting a load
    await homePage.open();

    await test.step('create account', async () => {
        // Also login in the account
        // Hover on 'My Account'
        await homePage.TheHeader.goToMyAcc();
        // Click on 'Create Account'
        await homePage.TheHeader.MyAccountButton.createAccount();
        // Fill email and click on 'Sign Up'
        await homePage.TheHeader.MyAccountButton.SignUp.clickSignUp();
    });

    await test.step('get event in data layer', async () => {
        // Init expected event
        const expectedEvent = {
            event: 'GeneralNonInteraction',
            eventCategory: 'Login',
            eventAction: 'Login Status',
            eventLabel: 'Registered - Email',
        };

        // Init array of event from dataLayer
        const [event] = await dataLayer.waitForDataLayer({
            event: 'GeneralNonInteraction',
            eventCategory: 'Login',
            eventAction: 'Login Status',
            eventLabel: 'Registered - Email',
        });

        // Checking that event strictly equal to expected event
        expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('change info in account and after check that info is changed', async () => {
        // Go to the account
        await homePage.TheHeader.goToWelcome();
        await homePage.TheHeader.WelcomeButton.goToMyAcc();

        // // Edit account
        // await accountPage.goToMyDetails();
        // await accountPage.MyDetails.editAccount();
    });
});
