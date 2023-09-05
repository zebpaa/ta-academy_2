import { FeaturedIn } from '@Components/featuredIn/featuredIn';
import { TheHeader } from '@Components/theHeader/theHeader';
import { ModalSignUp } from '@Components/modals/modalSignUp/modalSignUp';
import { ModalCreateAccount } from '@Components/modals/modalCreateAccount/modalCreateAccount';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        theHeader: this.page.locator('//header[@id = "page-header"]'),
        modalSignUp: this.page.locator('//div[contains(@class, "ReactModalPortal")]'),
        modalCreateAccount: this.page.locator('//div[contains(@class, "ReactModalPortal")]'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public TheHeader = new TheHeader(this.LOCATORS.theHeader, this.page);
    public ModalSignUp = new ModalSignUp(this.LOCATORS.modalSignUp, this.page);
    public ModalCreateAccount = new ModalCreateAccount(this.LOCATORS.modalCreateAccount, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'load' });
    }
}
