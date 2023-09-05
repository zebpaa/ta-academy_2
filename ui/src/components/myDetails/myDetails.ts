import { Component } from '@Core/component';

export class MyDetails extends Component {
    protected LOCATORS = {
        myDetails: this.page.locator('//a[contains(.,"My Details")]'),
    };

    // Function that click on 'My details'
    public async goToMyDetails(): Promise<void> {
        await this.LOCATORS.myDetails.click();
    }
}
