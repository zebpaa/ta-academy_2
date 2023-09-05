import { FeaturedIn } from '@Components/featuredIn';
import { TheHeader } from '@Components/theHeader';
import { Container } from '@Core/container';

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        theHeader: this.page.locator('//header[@id = "page-header"]'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public TheHeader = new TheHeader(this.LOCATORS.theHeader, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'load' });
    }
}
