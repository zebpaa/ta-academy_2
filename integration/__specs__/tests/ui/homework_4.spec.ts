import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { faker } from '@faker-js/faker';

describe('Open cart page, add cart item, fill all fields & press "Create"', () => {
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
        const cartModal = await cartPage.getCartModal();

        const nameInput = await cartModal.getCartNameInput();
        const priceInput = await cartModal.getCartPriceInput();
        const quantityInput = await cartModal.getCartQuantityInput();

        // Filling fields
        await nameInput.input(random.name);
        await priceInput.input(random.price.toString());
        await quantityInput.input(random.quantity.toString());

        await cartModal.createCartItemButton(); // Click on 'Create'

        const list = await cartPage.getCartList();
        const items = await list.getCartItems(); // Get array of items

        
        reporter.startStep('Check that the values of inputs are equal to values what we entered');
        const valueOfPriceInput = await Number(priceInput.getAttribute('value'));
        const valueOfQuantityInput = await Number(quantityInput.getAttribute('value'))

        expect(await nameInput.getAttribute('value')).toStrictEqual(random.name);
        expect(await valueOfPriceInput).toStrictEqual(random.price);
        expect(await valueOfQuantityInput).toStrictEqual(random.quantity);
        reporter.endStep();

        reporter.startStep('Checking that the length of the carsList array has increased by 1');
        expect(await items.length).toBe(4);
        reporter.endStep();

        // list.debug(); // To check the added item
        
        // First item
        const [item] = await list.getCartItems();
        await item.deleteItem();

        // Need to get a new list of elements to verify that the element was removed
        const newList = await cartPage.getCartList();
        const newItems = await newList.getCartItems();

        reporter.startStep('Check that the element that we removed is not on the page.');
        expect(await newItems.length).toBe(3);
        reporter.endStep();

        // newList.debug(); // To check the removed item
    });
});
