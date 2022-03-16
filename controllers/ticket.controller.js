import { createError } from '../services/errors.js';
import * as crud from './ticket-crud.js';

export const addAndUpdateProduct = async (req, res, next) => {
    try {
        const resp = await crud.insertProductIntoTicket(
            req.params.id,
            req.body.id
        );
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const resp = await crud.deleteProductFromTicket(
            req.params.id,
            req.body.id
        );
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};

export const getProducts = async (req, res) => {
    const resp = await crud.getAllProducts();
    res.json(resp);
};
