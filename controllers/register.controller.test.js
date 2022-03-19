import * as controller from './register.controller.js';
import bcrypt from 'bcryptjs';

import { User } from '../models/user.model.js';

jest.mock('../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

describe('Given the register controller', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { params: {} };
        res = {};
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });
    describe('When registerUser is triggered', () => {
        describe('And it works (promise is resolved)', () => {
            test('Then call json', async () => {
                req.body = { username: 'Pepe', password: '1234' };
                bcrypt.hashSync.mockReturnValue('encrypted1234');
                User.create.mockReturnValue({
                    username: 'Pepe',
                    password: 'encrypted1234',
                    id: 5,
                });

                await controller.userRegister(req, res, next);
                expect(res.json).toHaveBeenCalledWith({
                    username: 'Pepe',
                    password: 'encrypted1234',
                    id: 5,
                });
            });
        });
        describe('And it does not works (promise is rejected)', () => {
            test('Then call next', async () => {
                req.body = { username: 'Pepe', password: '1234' };
                bcrypt.hashSync.mockReturnValue('encrypted1234');
                User.create.mockRejectedValue(new Error('Error adding user'));
                await controller.userRegister(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And there is no password', () => {
            test('Then call next', async () => {
                req.body = { password: undefined };
                User.create.mockResolvedValue({});
                bcrypt.hashSync.mockImplementation(() => {
                    throw new Error('Error, no password');
                });
                await controller.userRegister(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And there is no user name', () => {
            test('Then call next', async () => {
                User.create.mockResolvedValue(null);
                await controller.userRegister(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
    });
});
