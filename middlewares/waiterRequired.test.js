import { User } from '../models/user.model.js';
import * as required from './waiterRequired.js';

jest.mock('../models/user.model.js');

describe('Given a route intercepted by userRequired', () => {
    let req;
    let res;
    let next;
    let userError;

    let user;
    beforeEach(() => {
        userError = new Error('Internal Error: Unauthorized');
        userError.status = 403;
        req = { tokenPayload: { id: 111 } };
        res = {};
        next = jest.fn();
    });
    // beforeEach(() => {
    //     User.findById.mockReturnValue(user);
    // });
    describe('When token user is the user of the ticket', () => {
        test('Then call next', async () => {
            user = {
                username: 'Sonia',
                role: 'Sala',
                password: '1111',
                id: '111',
            };
            User.findById.mockReturnValue(user);
            await required.waiterRequired(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When token user is the user of the task', () => {
        test('Then call next with error', async () => {
            req.tokenPayload.id = '2';
            user = {
                username: 'Sonia',
                role: 'Cocina',
                password: '1111',
                id: '111',
            };
            User.findById.mockReturnValue(user);
            await required.waiterRequired(req, res, next);
            expect(next).toHaveBeenCalledWith(userError);
        });
    });
});
