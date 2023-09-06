import { AccountDropDown } from './accountDropDown/accountDropDown';
import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        divAccountDropDown: this.locator.locator('//div[contains(@class, "topStrip__rightSide")]'),
        accountDropDown: this.locator.locator(
            '//button[contains(., "My Account") or contains(., "Welcome,")]'
        ),
    };

    public AccountDropDown = new AccountDropDown(this.LOCATORS.divAccountDropDown, this.page);

    // Function, that hover to drop down
    public async goToDropDown(): Promise<void> {
        await this.LOCATORS.accountDropDown.hover();
    }
}
