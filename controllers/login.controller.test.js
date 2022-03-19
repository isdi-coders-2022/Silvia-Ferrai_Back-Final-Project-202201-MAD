import * as controller from './login.controller.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';
import { User } from '../models/user.model.js';

jest.mock('../models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../services/auth.js');

describe('Given the login controller', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { params: {} };
        res = {};
        res.send = jest.fn().mockReturnValue();
        res.json = jest.fn().mockReturnValue();
        res.status = jest.fn();
        next = jest.fn();
    });

    describe('When login is triggered', () => {
        describe(' and there are not user name', () => {
            test('Then call next', async () => {
                req.body = { username: 'Carlos' };
                await controller.userLogin(req, res, next);
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            });
        });
    });

    describe('And there are not password', () => {
        test('Then call next', async () => {
            req.body = { password: '1111' };
            await controller.userLogin(req, res, next);
            expect(res.json).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        });
    });
    describe('And there are user name or password', () => {
        beforeEach(() => {
            req.body = { username: 'Carlos', password: '1234' };
        });
        describe('And the user name is not found', () => {
            test('Then call next', async () => {
                await User.findOne.mockResolvedValue(null);
                await controller.userLogin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });
        describe('And the password is no correct', () => {
            test('Then call next', async () => {
                await User.findOne.mockResolvedValue({});
                bcrypt.compareSync.mockReturnValue(null);
                await controller.userLogin(req, res, next);
                expect(next).toHaveBeenCalled();
            });
        });

        describe('And the user name and passwd are ok', () => {
            test('Then call send', async () => {
                const user = {
                    username: 'Ste',
                    password: '1111',
                    id: '234',
                };
                await User.findOne.mockResolvedValue(user);
                bcrypt.compareSync.mockReturnValue(true);
                createToken.mockReturnValue('mock_token');
                await controller.userLogin(req, res, next);
                expect(res.json).toHaveBeenCalledWith({
                    token: 'mock_token',
                    username: 'Ste',
                    id: '234',
                });
            });
        });
    });
});
