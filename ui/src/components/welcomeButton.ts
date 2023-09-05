import { Component } from '@Core/component';

export class WelcomeButton extends Component {
    protected LOCATORS = {
        goMyAcc: this.locator.locator('//li[contains(., "My Account")]'),
    };

    // Function, that go to myAccount
    public async goToMyAcc() {
        await this.LOCATORS.goMyAcc.click();
    }
}
