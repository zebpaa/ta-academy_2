import { EditInfo } from '@Components/editInfo/editInfo';
import { MyDetails } from '@Components/myDetails/myDetails';
import { TheHeader } from '@Components/theHeader/theHeader';
import { Container } from '@Core/container';

export class AccountPage extends Container {
    protected LOCATORS = {
        theHeader: this.page.locator('//header'),
        divMyDetails: this.page.locator('//div[contains(@class, "myAccountContent__container")]'),
    };

    public TheHeader = new TheHeader(this.LOCATORS.theHeader, this.page);
    public MyDetails = new MyDetails(this.LOCATORS.divMyDetails, this.page);
    public EditInfo = new EditInfo(this.LOCATORS.divMyDetails, this.page);
}
