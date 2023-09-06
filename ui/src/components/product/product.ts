import { Component } from '@Core/component';

export class Product extends Component {
    protected LOCATORS = {
        myPick: this.locator.locator('//div[@aria-label="myPick"]'),
    };

    // Function, that click to my pick
    public async clickMyPick(): Promise<void> {
        await this.LOCATORS.myPick.click();
    }
}
