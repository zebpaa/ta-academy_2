import { Component } from '@Core/component';

export class CartQuantityInput extends Component {
    protected selectors = {
        quantityInput: './/input[@name="quantity"]',
    };

    public async getNameInput() {
        await this.element.waitForXpath(this.selectors.quantityInput);
    }
}
