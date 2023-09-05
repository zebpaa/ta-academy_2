import { Component } from '@Core/component';
// Using Faker
import { faker } from '@faker-js/faker';

export class ModalCreateAccount extends Component {
    protected LOCATORS = {
        firstNameInput: this.locator.getByPlaceholder('First name'),
        lastNameInput: this.locator.getByPlaceholder('Last name'),
        passwordInput: this.locator.getByPlaceholder('Password'),
        singUp: this.locator.locator('//form//button[contains(.,"Sign Up")]'),
    };

    // Function that creates an account
    public async createAccount(): Promise<void> {
        // Create data
        const createUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
        };

        await this.LOCATORS.firstNameInput.fill(createUser.firstName);
        await this.LOCATORS.lastNameInput.fill(createUser.lastName);
        await this.LOCATORS.passwordInput.fill(createUser.password);
        await this.LOCATORS.singUp.click();
    }
}
