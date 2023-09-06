import { Component } from '@Core/component';
// Using Faker
import { faker } from '@faker-js/faker';

export class Modal extends Component {
    protected LOCATORS = {
        emailInput: this.locator.getByPlaceholder('Email Address'),
        singUp: this.locator.locator('//button[contains(.,"Sign Up")]'),
        firstNameInput: this.locator.getByPlaceholder('First name'),
        lastNameInput: this.locator.getByPlaceholder('Last name'),
        passwordInput: this.locator.getByPlaceholder('Password'),
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

    // Function that fill personal info
    public async fillPersonalInfo(): Promise<void> {
        // Create data
        const createUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
        };

        await this.LOCATORS.firstNameInput.fill(createUser.firstName);
        await this.LOCATORS.lastNameInput.fill(createUser.lastName);
        await this.LOCATORS.passwordInput.fill(createUser.password);
    }
}
