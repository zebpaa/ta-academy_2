import { Container } from '@Core/container';
import { CartList } from '@Components/cartPage/cartList/cartList';
import { CartModal } from './cartModal/cartModal';

export class CartPage extends Container {
    private selectors = {
        title: 'h1',
        cartList: './/div[@class="cart__list"]',
        addCart: './/button[contains(., "Add Cart Item")]',
        modal: '[data-testid="modal"]',
    };

    public async fulfill(): Promise<void> {
        await super.fulfill();
    }

    public async getHeaderTitle(): Promise<string> {
        const [title] = await document.waitForQuerySelector(this.selectors.title);
        return title.textContent;
    }

    public async getCartList(): Promise<CartList> {
        const [cartListElement] = await document.waitForXpath(this.selectors.cartList);
        return new CartList(cartListElement);
    }

    public async addCartItem(): Promise<void> {
        await document.clickByXpath(this.selectors.addCart);
    }

    public async getCartModal(): Promise<CartModal> {
        const [modal] = await document.waitForQuerySelector(this.selectors.modal);
        return new CartModal(modal);
    }
}
