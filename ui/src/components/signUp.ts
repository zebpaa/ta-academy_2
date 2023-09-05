import { Component } from '@Core/component';
// Using Faker
import { faker } from '@faker-js/faker';

export class SignUp extends Component {
    protected LOCATORS = {
        emailInput: this.locator.getByPlaceholder('Email Address'),
        singUp: this.locator.locator('//form//button[contains(.,"Sign Up")]'),
    };

    // Function that fill email and click to 'Sign Up'
    public async clickSignUp() {
        // Create data
        const email = faker.internet.email();

        await this.LOCATORS.emailInput.fill(email);
        return await this.LOCATORS.singUp.click();
    }
}
