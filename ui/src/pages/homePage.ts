import { FeaturedIn } from '@Components/featuredIn';
import { Container } from '@Core/container';
import { expect } from '@playwright/test';
// Using Faker
import { faker } from '@faker-js/faker';

export class HomePage extends Container {
  protected LOCATORS = {
    featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
    myAccount: this.page.locator('//header//button[contains(., "Welcome,")]'),
    myAcc: this.page.locator('//header//button[contains(., "My Account")]'),
    buttonCreateAccount: this.page.locator('//a[contains(., "Create Account")]'),
    emailInput: this.page.getByPlaceholder('Email Address'),
    singUp: this.page.locator('//form//button[contains(.,"Sign Up")]'),
    firstNameInput: this.page.getByPlaceholder('First name'),
    lastNameInput: this.page.getByPlaceholder('Last name'),
    passwordInput: this.page.getByPlaceholder('Password'),
    welcome: this.page.locator('//button[contains(., "Welcome,")]'),
    goMyAcc: this.page.locator('//li[contains(., "My Account")]'),
    myDetails: this.page.locator('//a[contains(.,"My Details")]'),
    editInfo: this.page.locator('//button[contains(.,"Edit Information")]'),
    firstNameLoc: this.page.getByPlaceholder('First name'),
    lastNameLoc: this.page.getByPlaceholder('Last name'),
    saveButton: this.page.locator('//button[contains(.,"Save")]'),
  };

  public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);

  public async open(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'load' });
  }

  // Function that creates an account
  public async createAccount(): Promise<void> {
    // Create data
    const createUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await this.LOCATORS.myAcc.hover();
    await this.LOCATORS.myAcc.click();
    await this.LOCATORS.buttonCreateAccount.click();
    await this.LOCATORS.emailInput.fill(createUser.email);
    await this.LOCATORS.singUp.click();
    await this.LOCATORS.firstNameInput.fill(createUser.firstName);
    await this.LOCATORS.lastNameInput.fill(createUser.lastName);
    await this.LOCATORS.passwordInput.fill(createUser.password);
    await this.LOCATORS.singUp.click();
  }

  // Function, that go to the account
  public async goToMyAcc(): Promise<void> {
    await this.LOCATORS.welcome.hover();
    await this.LOCATORS.goMyAcc.click();
  }

  // Function that changes account`s info
  public async editAccount(): Promise<void> {
    await this.LOCATORS.myDetails.click();
    await this.LOCATORS.editInfo.click();

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

    await this.LOCATORS.saveButton.click();

    // Check changed info
    await expect(firstNameInput).toHaveValue(newUserInfo.firstName);
    await expect(lastNameInput).toHaveValue(newUserInfo.lastName);
  }
}
