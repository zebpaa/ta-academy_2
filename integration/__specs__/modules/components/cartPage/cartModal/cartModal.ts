import { CartNameInput } from './cartNameInput/cartNameInput';
import { CartPriceInput } from './cartPriceInput/cartPriceInput';
import { CartQuantityInput } from './cartQuantityInput/cartQuantityInput';
import { Component } from '@Core/component';

export class CartModal extends Component {
    protected selectors = {
        nameInput: './/input[@name="name"]',
        priceInput: './/input[@name="price"]',
        quantityInput: './/input[@name="quantity"]',
        createButton: './/button[contains(.,"Create")]',
    };

    public async getCartNameInput(): Promise<CartNameInput> {
        const [nameInput] = await this.element.waitForXpath(this.selectors.nameInput);
        return new CartNameInput(nameInput);
    }

    public async getCartPriceInput(): Promise<CartPriceInput> {
        const [priceInput] = await this.element.waitForXpath(this.selectors.priceInput);
        return new CartPriceInput(priceInput);
    }

    public async getCartQuantityInput(): Promise<CartQuantityInput> {
        const [quantityInput] = await this.element.waitForXpath(this.selectors.quantityInput);
        return new CartQuantityInput(quantityInput);
    }

    public async createCartItemButton(): Promise<void> {
        await this.element.clickByXpath(this.selectors.createButton);
    }
}
