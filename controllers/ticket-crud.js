import { products } from '../data/products-data.js';
import { Ticket } from '../models/ticket.model.js';
import { createError } from '../services/errors.js';

export function getAllProducts() {
    return products;
}

export async function createTicket(req, res, next) {
    try {
        const ticketData = { ...req.body };
        const newTicket = await Ticket.create(ticketData);
        res.json(newTicket);
    } catch (error) {
        next(createError(error));
    }
}

export async function getAllTickets(req, res, next) {
    try {
        const ticketsData = { ...req.body, Ticket };
        const tickets = await Ticket.find(ticketsData);
        res.json(tickets);
    } catch (error) {
        next(createError(error));
    }
}

export async function insertProductIntoTicket(ticketId, productId) {
    const ticket = await Ticket.findById(ticketId);
    const product = products.find((e) => e.id === productId);

    if (ticket.items.some((e) => e.article.id === productId)) {
        await Ticket.updateOne(
            { 'items.article.id': productId },
            {
                $inc: {
                    'items.$.uds': 1,
                },
            }
        );
        return await Ticket.findById(ticketId);
    } else {
        return await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $push: { items: { uds: 1, article: product } },
            },
            { new: true }
        );
    }
}

export async function deleteProductFromTicket(ticketId, productId) {
    const ticket = await Ticket.findById(ticketId);

    const productIsInTicket = ticket.items.some(
        (e) => e.article.id === productId
    );

    const thereAreOneUnit = ticket.items.some((item) => item.uds === 1);

    if (productIsInTicket && thereAreOneUnit) {
        return await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $pull: { items: { 'article.id': { $eq: +productId } } },
            },
            { new: true }
        );
    } else {
        await Ticket.updateOne(
            { 'items.article.id': productId },
            {
                $inc: {
                    'items.$.uds': -1,
                },
            }
        );
        return await Ticket.findById(ticketId);
    }
}
