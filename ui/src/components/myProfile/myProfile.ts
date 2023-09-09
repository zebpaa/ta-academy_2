import { Component } from '@Core/component';

export class MyProfile extends Component {
    protected LOCATORS = {
        myProfile: this.page.locator('//a[contains(.,"My Details")]'),
    };

    // Function that click on 'My details'
    public async goToMyDetails(): Promise<void> {
        await this.LOCATORS.myProfile.click();
    }
}
