import * as login from './loginRequired.js';
import { verifyToken } from '../services/auth.js';

jest.mock('../services/auth.js');

describe('Given a route intercepted by loginRequired', () => {
    let req;
    let res;
    let next;
    let tokenError;
    beforeEach(() => {
        tokenError = new Error('token missing or invalid');
        tokenError.status = 401;
        req = { params: {} };
        res = {};
        req.get = jest.fn();
        res.send = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        next = jest.fn();
    });
    describe('When authorization token is present', () => {
        describe('And token is valid', () => {
            test('Then call next', () => {
                req.get.mockReturnValue('bearer token');
                verifyToken.mockReturnValue({});
                login.loginRequired(req, res, next);
                expect(next).toHaveBeenCalledWith();
            });
        });
        describe('And token is not valid', () => {
            test('Then call next with error', () => {
                req.get.mockReturnValue('bearer token');
                verifyToken.mockReturnValue('bad token');
                login.loginRequired(req, res, next);
                expect(next).toHaveBeenCalledWith(tokenError);
            });
        });
    });
    describe('When authorization token is not present', () => {
        test('Then call next with error', () => {
            req.get.mockReturnValue('');
            login.loginRequired(req, res, next);
            expect(next).toHaveBeenCalledWith(tokenError);
        });
    });
});
