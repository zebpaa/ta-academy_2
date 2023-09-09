import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Wishlist extends Component {
    protected LOCATORS = {
        product: this.locator.locator('//li[@data-test-name="itemMyPicks"]'),
    };

    // Function, that check product in Wishlist
    public checkProduct(): Locator {
        return this.LOCATORS.product;
    }
}
