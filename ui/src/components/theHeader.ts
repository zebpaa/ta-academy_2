import { MyAccountButton } from './myAccountButton';
import { WelcomeButton } from './welcomeButton';
import { Component } from '@Core/component';

export class TheHeader extends Component {
    protected LOCATORS = {
        myAccountButton: this.locator.locator('//button[contains(., "My Account")]'),
        divMyAccountButton: this.locator.locator('//div[contains(@class, "topStrip__rightSide")]'),
        welcomeButton: this.locator.locator('//button[contains(., "Welcome,")]'),
    };

    public MyAccountButton = new MyAccountButton(this.LOCATORS.divMyAccountButton, this.page);
    public WelcomeButton = new WelcomeButton(this.LOCATORS.welcomeButton, this.page);

    // Function, that hover to myAccount
    public async goToMyAcc() {
        await this.LOCATORS.myAccountButton.hover();
    }

    // Function, that hover to welcomeButton
    public async goToWelcome() {
        await this.LOCATORS.welcomeButton.hover();
    }
}
