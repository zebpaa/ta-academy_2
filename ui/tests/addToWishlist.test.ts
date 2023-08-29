import { test, expect } from '@playwright/test';
import { timeout } from '@Utils/timeout';
import { DataLayer } from '@Utils/dataLayer';

test.describe('has wishlist', () => {
  test('add the product to my pick on the sunglasses page', async ({ page }) => {
    await page.goto('/');
    //   //nav//li[contains(., 'Sunglasses')] need, that we will click on Sunglasses page
    //   //li//div[@aria-label="myPick"] but need to scroll to the page`s footer
    // aria-pressed="true" when we added product to my pick
    //   //div[contains(@class, 'myPicksIcon__myPicks')] need, that to click on 'Wishlist'
    //   //li[@data-test-name="itemMyPicks"] need, that check products in 'Wishlist'
  });
});
