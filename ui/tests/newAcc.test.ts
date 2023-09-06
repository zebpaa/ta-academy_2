import { test, expect } from '@Test';

test('check event in data layer after create account', async ({
    homePage,
    accountPage,
    dataLayer,
}) => {
    // Going to URL, don't waiting a load
    await homePage.open();

    await test.step('create account', async () => {
        // Hover on 'My Account'
        await homePage.Header.goToDropDown();
        // Click on 'Create Account'
        await homePage.Header.AccountDropDown.createAccount();
        // Fill email and click on 'Sign Up'
        await homePage.Modal.fillEmail();
        await homePage.Modal.clickSignUp();
        await homePage.Modal.fillPersonalInfo();
        await homePage.Modal.clickSignUp();
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
        await homePage.Header.goToDropDown();
        await homePage.Header.AccountDropDown.goToMyAcc();

        // Edit account
        await accountPage.MyProfile.goToMyDetails();
        await accountPage.MyDetails.goToEditInfo();
        await accountPage.MyDetails.editAccount();
    });
});
