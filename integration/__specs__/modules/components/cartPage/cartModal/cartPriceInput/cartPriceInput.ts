import { Component } from '@Core/component';

export class CartPriceInput extends Component {
    protected selectors = {
        priceInput: './/input[@name="price"]',
    };

    public async getNameInput() {
        await this.element.waitForXpath(this.selectors.priceInput);
    }
}
