import { products } from '../data/products-data.js';
import { Ticket } from '../models/ticket.model.js';
import { createError } from './errors.js';

export function getAllProducts() {
    return products;
}

export async function createTicket(body, Ticket) {
    const newTicket = new Ticket(body);
    return await newTicket.save();
}

export async function getAllTickets(Ticket) {
    return await Ticket.find({});
}

export async function getTicket(id, Ticket) {
    return await Ticket.findById(id);
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
