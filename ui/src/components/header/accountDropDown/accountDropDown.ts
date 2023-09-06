import { Component } from '@Core/component';

export class AccountDropDown extends Component {
    protected LOCATORS = {
        createAccountButton: this.locator.locator('a', { hasText: 'Create Account' }),
        goMyAcc: this.locator.locator('//li[contains(., "My Account")]'),
    };

    public async createAccount(): Promise<void> {
        await this.LOCATORS.createAccountButton.click();
    }

    // Function, that go to myAccount
    public async goToMyAcc() {
        await this.LOCATORS.goMyAcc.click();
    }
}
