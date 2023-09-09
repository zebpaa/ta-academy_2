import { Component } from '@Core/component';

export class CartNameInput extends Component {
    protected selectors = {
        nameInput: './/input[@name="name"]',
    };

    public async getNameInput() {
        await this.element.waitForXpath(this.selectors.nameInput);
    }
}
