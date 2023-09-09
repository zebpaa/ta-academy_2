import { CartPage } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { findAllInDataLayer, waitForDataLayer } from '@Utils/dataLayer';
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

    test('Add a new item to the cart, then delete him', async () => {
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

        cartModal.createCartItemButton(); // Click on 'Create'

        reporter.startStep('Add item - "your item name" event');
        const addItemEvent = await waitForDataLayer({ name: "Add item - 'your item name'" });
        expect(addItemEvent).toStrictEqual({
            name: 'Add item - "your item name"',
            price: 'your item price',
            quantity: 'your item quantity',
            value: 'your item name',
        });
        reporter.endStep();

        const list = await cartPage.getCartList();
        const items = await list.getCartItems(); // Get array of items

        // list.debug(); // To check the added item

        // First item
        const [item] = await list.getCartItems();
        item.deleteItem();

        reporter.startStep('Delete item - "your item name" event');
        const deleteItemEvent = await waitForDataLayer({ name: "Delete item - 'your item name'" });
        expect(deleteItemEvent).toStrictEqual({
            name: "Delete item - 'your item name'",
            value: "your item name"
        });
        reporter.endStep();

        // Need to get a new list of elements to verify that the element was removed
        const newList = await cartPage.getCartList();
        const newItems = await newList.getCartItems();

        // newList.debug(); // To check the removed item

        // Function, that delete all items. Need to write!

        reporter.startStep('Cart is Empty event');
        const deleteAllItemsEvent = findAllInDataLayer('Cart is Empty');
        expect(deleteAllItemsEvent).toHaveLength(2);
        reporter.endStep();
    });
});
