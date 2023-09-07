import { AccountDropDown } from './accountDropDown/accountDropDown';
import { Wishlist } from './wishlist/wishlist';
import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        divAccountDropDown: this.locator.locator(
            '//div[contains(@class, "myAccountAndOrders__tooltipContainer")]'
        ),
        accountDropDown: this.locator.locator(
            '//button[contains(., "My Account") or contains(., "Welcome,")]'
        ),
        wishlist: this.locator.locator('//div[@aria-label="View My Picks"]'),
        divWislist: this.locator.locator('//div[@class="mypicks-tab-container"]'),
    };

    public AccountDropDown = new AccountDropDown(this.LOCATORS.divAccountDropDown, this.page);
    public Wishlist = new Wishlist(this.LOCATORS.divWislist, this.page);

    // Function, that hover to drop down
    public async goToDropDown(): Promise<void> {
        await this.LOCATORS.accountDropDown.hover();
    }

    // Function, that click to MyPickHeader
    public async goToWishlist(): Promise<void> {
        await this.LOCATORS.wishlist.click();
    }
}
