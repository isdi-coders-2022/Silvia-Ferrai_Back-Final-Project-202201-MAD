import * as crud from './ticket-crud.js';
import { mongoConnect, mongoDisconnect } from './db.js';
import { Ticket } from '../models/ticket.model.js';

jest.mock('../models/ticket.model.js');

describe('Given a list of products', () => {
    describe('when getAllProducts is called', () => {
        test('should get all products', () => {
            const result = crud.getAllProducts();
            expect(result[0]).toEqual({
                id: 1,
                item: 'Margherita',
                price: 9,
                type: 'pizza',
            });
        });
    });
});

describe('Given a connection with a MongoDB', () => {
    describe('when a collection is defined ', () => {
        const id = '1';
        const collection = 'Ticket';

        beforeAll(async () => {
            Ticket.find.mockResolvedValue([{ id: '1' }]);
            Ticket.findById.mockResolvedValue({ id: '1' });
            Ticket.findByIdAndDelete.mockResolvedValue({ id: '1' });
            Ticket.create.mockResolvedValue({
                items: [],
            });

            await mongoConnect();
        });

        afterAll(async () => {
            await mongoDisconnect();
        });

        test('should connect to the collection', async () => {
            expect(Ticket).toBeTruthy();
            expect(Ticket.modelName).toBe(collection);
        });

        describe('and try to create a new Ticket', () => {
            test('should add a ticket', async () => {
                const newTicket = {
                    items: [],
                };
                const result = await crud.createTicket(newTicket, Ticket);
                expect(result).toHaveProperty('items');
            });
        });

        describe('and try to get all the items', () => {
            test('should get all of them', async () => {
                const result = await crud.getAllTickets(Ticket);
                expect(result.length).toBe(1);
            });
        });

        describe('and try to get one item by id', () => {
            test('should find and get the item', async () => {
                const result = await crud.getTicket(id, Ticket);
                expect(result).toHaveProperty('id');
            });
        });

        describe('and try to get and delete the item', () => {
            test('should delete the item', async () => {
                const result = await crud.deleteTicket(id, Ticket);
                expect(result).toHaveProperty('id');
            });
        });
    });

    describe('and insert a new product into the ticket', () => {
        beforeEach(async () => {
            await Ticket.findById.mockResolvedValue({
                id: '1',
                items: [
                    {
                        article: {
                            id: '2',
                        },
                    },
                ],
            });
        });
        test('should increment the uds', async () => {
            const productId = '2';
            await crud.insertProductIntoTicket('1', productId);
            expect(Ticket.updateOne).toHaveBeenCalled();
            expect(Ticket.findById).toHaveBeenCalled();
        });
        test('should add a new article', async () => {
            const productId = '3';
            await crud.insertProductIntoTicket('1', productId);
            expect(Ticket.findByIdAndUpdate).toHaveBeenCalled();
        });
    });

    describe('and delete a product into the ticket', () => {
        beforeEach(async () => {
            await Ticket.findById.mockResolvedValue({
                id: '1',
                uds: '1',
                items: [
                    {
                        article: {
                            id: '2',
                        },
                    },
                ],
            });
        });
        test('should decrement the uds', async () => {
            const productId = '2';
            await crud.deleteProductFromTicket('1', productId);
            expect(Ticket.findById).toHaveBeenCalled();
        });
        test('should remove a article', async () => {
            const productId = '3';
            await crud.deleteProductFromTicket('1', productId);
            expect(Ticket.updateOne).toHaveBeenCalled();
            expect(Ticket.findByIdAndUpdate).toHaveBeenCalled();
        });
    });
});
