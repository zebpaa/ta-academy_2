import { Component } from '@Core/component';
// import { expect } from '@playwright/test';
// Using Faker
import { faker } from '@faker-js/faker';
import type { Locator } from '@playwright/test';

export class MyDetails extends Component {
    protected LOCATORS = {
        editInfoButton: this.locator.locator('//button[contains(.,"Edit Information")]'),
        firstNameLoc: this.locator.getByPlaceholder('First name'),
        lastNameLoc: this.locator.getByPlaceholder('Last name'),
        saveButton: this.locator.locator('//button[contains(.,"Save")]'),
    };

    // Function that click on 'edit information'
    public async goToEditInfo(): Promise<void> {
        await this.LOCATORS.editInfoButton.click();
    }

    // Function that changes account`s info
    public async editAccount(): Promise<{
        firstName: string;
        lastName: string;
    }> {
        // Create new data
        const newUserInfo = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        };

        // Edit info
        const firstNameInput = this.LOCATORS.firstNameLoc;
        await firstNameInput.fill(newUserInfo.firstName);

        const lastNameInput = this.LOCATORS.lastNameLoc;
        await lastNameInput.fill(newUserInfo.lastName);

        // Click on 'Save'
        await this.LOCATORS.saveButton.click();

        return newUserInfo;
    }

    public getFirstNameInput(): Locator {
        return this.LOCATORS.firstNameLoc;
    }

    public getLastNameInput(): Locator {
        return this.LOCATORS.lastNameLoc;
    }
}
