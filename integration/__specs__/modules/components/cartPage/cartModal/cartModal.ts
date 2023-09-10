import { Component } from '@Core/component';

export class CartModal extends Component {
    protected selectors = {
        nameInput: './/input[@name="name"]',
        priceInput: './/input[@name="price"]',
        quantityInput: './/input[@name="quantity"]',
        createButton: './/button[contains(.,"Create")]',
    };

    public async getCartNameInput(): Promise<Component> {
        const [nameInput] = await this.element.waitForXpath(this.selectors.nameInput);
        return new Component(nameInput);
    }

    public async getCartPriceInput(): Promise<Component> {
        const [priceInput] = await this.element.waitForXpath(this.selectors.priceInput);
        return new Component(priceInput);
    }

    public async getCartQuantityInput(): Promise<Component> {
        const [quantityInput] = await this.element.waitForXpath(this.selectors.quantityInput);
        return new Component(quantityInput);
    }

    public async createCartItemButton(): Promise<void> {
        await this.element.clickByXpath(this.selectors.createButton);
    }
}
