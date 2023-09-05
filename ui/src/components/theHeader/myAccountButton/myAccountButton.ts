import { Component } from '@Core/component';

export class MyAccountButton extends Component {
    protected LOCATORS = {
        createAccountButton: this.locator.locator('a', { hasText: 'Create Account' }),
    };

    public async createAccount(): Promise<void> {
        await this.LOCATORS.createAccountButton.click();
    }
}
