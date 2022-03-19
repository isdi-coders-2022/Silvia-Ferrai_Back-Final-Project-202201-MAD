import request from 'supertest';
import { app, server } from '../index.js';
import { User } from '../models/user.model.js';
import { Ticket } from '../models/ticket.model.js';
import { createToken } from '../services/auth.js';
import data from '../data-test/data-test.js';
import { installTicket, installUsers } from '../services/db.js';

describe('Given the test database with a initial Tickets collection', () => {
    let authToken;
    let firstTicketId;
    let firstUserId;

    beforeAll(() => {
        server.close();
    });

    beforeEach(async () => {
        await installUsers(data.users);
        const mockUsers = await User.find({});
        firstUserId = mockUsers[0].id;

        authToken = createToken({
            name: mockUsers[0].name,
            id: mockUsers[0].id,
        });

        await installTicket(data.tickets);
        const mockTickets = await Ticket.find({});
        firstTicketId = mockTickets[0]._id;
        await Ticket.deleteMany({});
        const result = await Ticket.insertMany(mockTickets);
        firstTicketId = result[0].id;
    });

    afterEach(() => {
        server.close();
    });

    describe('When the request is GET / products ', function () {
        describe('no authentication', () => {
            test('responds with json & status 200', async function () {
                const response = await request(app).get('/ticket/product');
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('When the request is POST /user ', function () {
        describe('And user is valid', () => {
            test('responds with json & status 200', async function () {
                const user = {
                    username: 'Sandrino',
                    role: 'Cocina',
                    password: '1234',
                };
                const response = await request(app).post('/user').send(user);
                expect(response.statusCode).toBe(200);
            });
        });
        // describe('And user is not valid', () => {
        //     test('responds with json & status 500', async function () {
        //         const user = {};
        //         const response = await request(app).post('/user').send(user);
        //         expect(response.statusCode).toBe(500);
        //     });
        // });
    });
    describe('When the request is POST /login ', function () {
        describe('When user is valid', () => {
            test('responds with json & status 200', async function () {
                const user = { username: 'Sandrino', password: '1234' };
                const response = await request(app)
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .send(user);
                expect(response.statusCode).toBe(200);
            });
        });
    });
    // describe('When user is not valid', () => {
    //     test('responds with json & status 401', async function () {
    //         const user = { username: 'Marta', password: '12345' };
    //         const response = await request(app)
    //             .post('/user/login')
    //             .set('Accept', 'application/json')
    //             .send(user);
    //         expect(response.statusCode).toBe(401);
    //     });
    // });
    // describe('When password is not valid', () => {
    //     test('responds with json & status 401', async function () {
    //         const user = { username: 'Sandrino', password: '3465' };
    //         const response = await request(app)
    //             .post('/user/login')
    //             .set('Accept', 'application/json')
    //             .send(user);
    //         expect(response.statusCode).toBe(401);
    //     });
    // });
    describe('When the request is GET / tickets ', function () {
        describe('with authentication', () => {
            test('responds with json & status 200', async function () {
                const response = await request(app)
                    .get('/ticket')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'bearer ' + authToken);
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('When the request is GET / ticket ', function () {
        describe('with authentication', () => {
            test('responds with json & status 200', async function () {
                const response = await request(app)
                    .get('/ticket/' + firstTicketId)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'bearer ' + authToken);
                expect(response.statusCode).toBe(200);
            });
        });
        // describe('without authentication', function () {
        //     test('responds with json & status 401', async function () {
        //         const response = await request(app).get('/ticket');
        //         expect(response.statusCode).toBe(401);
        //     });
        // });
    });

    describe('When the request is POST /ticket/ (no protected)', () => {
        describe('and the data in the body are ok', () => {
            test('responds with status 200', async () => {
                const ticket = {
                    items: [],
                };
                const response = await request(app)
                    .post('/ticket')
                    .send(ticket)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200);
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('When the request is PATCH /ticket/product/ (no protected)', () => {
        describe('with authentication', () => {
            test('responds with status 200', async () => {
                const ticket = {
                    items: [{ uds: 1, article: data.tickets }],
                };
                // eslint-disable-next-line no-unused-vars
                const response = await request(app)
                    .patch('/ticket/product/' + firstTicketId)
                    .send(ticket)
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200);
            });
        });
        // describe('without authentication', () => {
        //     test('responds with status 401', async () => {
        //         // eslint-disable-next-line no-unused-vars
        //         const response = await request(app)
        //             .patch('/ticket/product/' + firstTicketId)
        //             .expect(401);
        //     });
        // });
    });

    describe('DELETE /ticket', function () {
        describe('with authentication', () => {
            test('responds with json', async function () {
                // eslint-disable-next-line no-unused-vars
                const response = await request(app)
                    .delete('/ticket/' + firstTicketId)
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200);
            });
        });
    });

    describe('DELETE /ticket', function () {
        describe('with authentication', () => {
            test('responds with json', async function () {
                // eslint-disable-next-line no-unused-vars
                const response = await request(app)
                    .delete('/ticket/product/' + firstTicketId)
                    .set('Authorization', 'bearer ' + authToken)
                    .expect(200);
            });
        });
    });
});
