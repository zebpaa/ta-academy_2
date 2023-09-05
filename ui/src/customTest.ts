import type { Page } from '@playwright/test';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { AccountPage } from '@Pages/accountPage';
import { DataLayer } from '@Utils/dataLayer';
import { test as base, expect } from '@playwright/test';

type Options = {
    page: Page;
    homePage: HomePage;
    categoryPage: CategoryPage;
    accountPage: AccountPage;
    dataLayer: DataLayer;
};

const test = base.extend<Options>({
    page: async ({ page, context, baseURL }, use) => {
        await context.addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await use(page);
    },

    // Init dataLayer
    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },
    // Init homePage
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    // Init categoryPage
    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },
    // Init accountPage
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
});

export { test, expect };
