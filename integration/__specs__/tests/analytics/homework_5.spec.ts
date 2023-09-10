import { CartPage } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { waitForDataLayer } from '@Utils/dataLayer';
import { faker } from '@faker-js/faker';

describe('Check dataLayer event on cart page', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;
    // Init random data
    const random = {
        name: faker.commerce.product(),
        price: faker.number.int({ min: 10, max: 100 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
    };

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    test('Events should be in dataLayer', async () => {
        await cartPage.fulfill();

        await cartPage.addCartItem(); // Click on 'Add Cart Item'

        reporter.startStep('FormInteraction event');
        const formInteractionEvent = await waitForDataLayer({ name: 'FormInteraction' });
        expect(formInteractionEvent).toStrictEqual({ name: 'FormInteraction', value: 'Open' });
        reporter.endStep();

        const cartModal = await cartPage.getCartModal();

        const nameInput = await cartModal.getCartNameInput();
        const priceInput = await cartModal.getCartPriceInput();
        const quantityInput = await cartModal.getCartQuantityInput();

        // Filling fields
        nameInput.input(random.name);
        priceInput.input(random.price.toString());
        quantityInput.input(random.quantity.toString());

        await cartModal.createCartItemButton(); // Click on 'Create'

        reporter.startStep('Add item event');
        const addItemEvent = await waitForDataLayer({ name: `Add item - ${random.name}` });
        expect(addItemEvent).toStrictEqual({
            name: `Add item - ${random.name}`,
            price: random.price,
            quantity: random.quantity,
            value: random.name,
        });
        reporter.endStep();

        const list = await cartPage.getCartList();

        // First item
        const [item] = await list.getCartItems();
        await item.deleteItem();

        reporter.startStep('Delete item event');
        const deleteItemEvent = await waitForDataLayer({ name: `Delete item - ${random.name}` });
        expect(deleteItemEvent).toStrictEqual({
            name: `Delete item - ${random.name}`,
            value: random.name,
        });
        reporter.endStep();

        // Сycle of deleted remaining elements
        for (let i = 0; i < 3; i++) {
            const newList = await cartPage.getCartList();
            const [newItems] = await newList.getCartItems();
            await newItems.deleteItem();
        }

        // const emptyList = await cartPage.getCartList();
        // emptyList.debug(); // To check all deleted items

        reporter.startStep('Cart is Empty event');
        const deleteAllItemsEvent = await waitForDataLayer({ name: 'Cart is Empty' });
        expect(deleteAllItemsEvent).toStrictEqual({
            name: 'Cart is Empty',
            value: 'Quantity of products: 0',
        });
        reporter.endStep();
    });
});
