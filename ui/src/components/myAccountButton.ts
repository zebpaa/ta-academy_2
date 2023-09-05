import { SignUp } from './signUp';
import { Component } from '@Core/component';

export class MyAccountButton extends Component {
    protected LOCATORS = {
        createAccountButton: this.locator.locator('//a[contains(., "Create Account")]'),
        signUp: this.locator.locator('//form//button[contains(.,"Sign Up")]'),
    };

    public SignUp = new SignUp(this.LOCATORS.signUp, this.page);

    public async createAccount() {
        await this.LOCATORS.createAccountButton.click();
    }
}
