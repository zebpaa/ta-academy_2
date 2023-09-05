import { MyDetails } from '@Components/myDetails';
import { TheHeader } from '@Components/theHeader';
import { Container } from '@Core/container';

export class AccountPage extends Container {
    protected LOCATORS = {
        theHeader: this.page.locator('//header'),
        myDetails: this.page.locator('//a[contains(.,"My Details")]'),
    };

    public TheHeader = new TheHeader(this.LOCATORS.theHeader, this.page);
    public MyDetails = new MyDetails(this.LOCATORS.myDetails, this.page);

    public async open(url: 'customer/account'): Promise<void> {
        await this.page.goto(`/${url}`, { waitUntil: 'domcontentloaded' });
    }

    public async goToMyDetails(): Promise<void> {
        await this.LOCATORS.myDetails.click();
    }
}
