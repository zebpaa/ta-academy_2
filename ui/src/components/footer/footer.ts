import { Component } from '@Core/component';
// Using Faker
import { faker } from '@faker-js/faker';

export class Footer extends Component {
    protected LOCATORS = {
        emailInput: this.locator.getByPlaceholder('Enter your Email'),
        singUp: this.locator.locator('//button[contains(.,"Sign Up")]'),
    };

    // Function that fill email
    public async fillEmail(): Promise<void> {
        // Create data
        const email = faker.internet.email();

        await this.LOCATORS.emailInput.fill(email);
    }

    // Function that click to 'Sign Up'
    public async clickSignUp(): Promise<void> {
        // Create data
        await this.LOCATORS.singUp.click();
    }
}
