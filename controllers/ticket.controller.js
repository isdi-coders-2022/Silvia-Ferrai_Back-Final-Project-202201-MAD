import { createError } from '../services/errors.js';
import * as crud from '../services/ticket-crud.js';
import { Ticket } from '../models/ticket.model.js';

export const getAllTickets = async (req, res, next) => {
    try {
        const resp = await crud.getAllTickets(Ticket);
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};

export const addNewTicket = async (req, res, next) => {
    try {
        const resp = await crud.createTicket(req.body, Ticket);
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};
export const getTicket = async (req, res, next) => {
    try {
        const resp = await crud.getTicket(req.params.id, Ticket);
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};

export const deleteTicket = async (req, res, next) => {
    try {
        const resp = await crud.deleteTicket(req.params.id, Ticket);
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};

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

export const getProducts = async (req, res, next) => {
    try {
        const resp = await crud.getAllProducts();
        res.json(resp);
    } catch (error) {
        next(createError(error));
    }
};
