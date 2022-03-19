import * as crud from '../services/ticket-crud.js';
// import { Ticket } from '../models/ticket.model.js';
import * as controller from './ticket.controller.js';

jest.mock('../services/ticket-crud.js');
jest.mock('../models/ticket.model.js');

describe('Given the tickets controller', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {};
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });
    describe('When getAllTickets is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                crud.getAllTickets.mockResolvedValue([{}]);
            });
            test('Then call json', async () => {
                await controller.getAllTickets(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
    });
    describe('And it does not work (promise is rejected)', () => {
        beforeEach(() => {
            crud.getAllTickets.mockRejectedValue(
                new Error('Get All Tasks not possible')
            );
        });
        test('Then call next', async () => {
            await controller.getAllTickets(req, res, next);
            expect(res.json).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When  addNewTicket is triggered', () => {
        describe('And is trying to add a Ticket(promise is resolved)', () => {
            beforeEach(() => {
                crud.createTicket.mockResolvedValue({});
            });
            test('Then call json', async () => {
                await controller.addNewTicket(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And add ticket is not possible (promise is resolved)', () => {
            beforeEach(() => {
                crud.createTicket.mockRejectedValue(
                    new Error('Add ticket not possible')
                );
            });
            test('Then call next', async () => {
                await controller.addNewTicket(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
            });
        });
    });
    describe('When  getTicket is triggered', () => {
        describe('And the id is found (promise resolved)', () => {
            beforeEach(() => {
                req.params.id = '619516dd75bcdf9b77e6690c';
                crud.getTicket.mockResolvedValue([]);
            });
            test('Then call json', async () => {
                await controller.getTicket(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And the id is not found (promise rejected)', () => {
            beforeEach(() => {
                req.params.id = '0000';
                crud.getTicket.mockRejectedValue(
                    new Error('The id has not be found')
                );
            });
            test('Then call next', async () => {
                await controller.getTicket(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
            });
        });
    });
    describe('When deleteTicket is triggered', () => {
        describe('And id exists', () => {
            beforeEach(() => {
                crud.deleteTicket.mockResolvedValue([]);
            });
            test('Then call json', async () => {
                await controller.deleteTicket(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And id not exists', () => {
            beforeEach(() => {
                req.params.id = '619516dd75bcdf9b77e6690c';
                crud.deleteTicket.mockResolvedValue(null);
            });
            test('Then call json', async () => {
                await controller.deleteTicket(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And there are a error (promise rejected)', () => {
            beforeEach(() => {
                crud.deleteTicket.mockRejectedValue(
                    new Error('Error test deleting a ticket')
                );
            });
            test('Then call next', async () => {
                await controller.deleteTicket(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When addAndUpdateProduct is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                crud.insertProductIntoTicket.mockResolvedValue({});
            });
            test('Then call json', async () => {
                await controller.addAndUpdateProduct(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And there are a error (promise rejected)', () => {
            beforeEach(() => {
                crud.insertProductIntoTicket.mockRejectedValue(
                    new Error('Error test updating a article')
                );
            });
            test('Then call next', async () => {
                await controller.addAndUpdateProduct(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('When deleteProduct is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                crud.deleteProductFromTicket.mockResolvedValue({});
            });
            test('Then call json', async () => {
                await controller.deleteProduct(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And there are a error (promise rejected)', () => {
            beforeEach(() => {
                crud.deleteProductFromTicket.mockRejectedValue(
                    new Error('Error test deleting a article')
                );
            });
            test('Then call next', async () => {
                await controller.deleteProduct(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });
    describe('When getProducts is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            beforeEach(() => {
                crud.getAllProducts.mockResolvedValue([{}]);
            });
            test('Then call json', async () => {
                await controller.getProducts(req, res, next);
                expect(res.json).toHaveBeenCalled();
            });
        });
        describe('And there are a error (promise rejected)', () => {
            beforeEach(() => {
                crud.getAllProducts.mockRejectedValue(
                    new Error('Get All Products not possible')
                );
            });
            test('Then call next', async () => {
                await controller.getProducts(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });
});
