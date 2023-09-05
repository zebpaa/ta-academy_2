import { MockObject } from '@Mocks/mockObject';

export class GetCartItemsMock extends MockObject {
    public constructor() {
        super();
        this.path = {
            url: 'https://mocki.io/v1/a92eda42-69d0-43c5-bc66-cd56e4b8c906',
            method: 'get',
        };
    }

    public getFixture(): Record<string, unknown>[] {
        return [
            {
                id: 1,
                name: 'T-shirt',
                price: 30,
                quantity: 4,
            },
            {
                id: 2,
                name: 'Jacket',
                price: 42,
                quantity: 5,
            },
            {
                id: 3,
                name: 'Dress',
                price: 20,
                quantity: 2,
            },
        ];
    }
}
