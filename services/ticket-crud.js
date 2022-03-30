import { products } from '../data/products-data.js';
import { Ticket } from '../models/ticket.model.js';

export function getAllProducts() {
    return products;
}

export async function createTicket(body, Ticket) {
    const newTicket = await Ticket.create(body);
    return newTicket;
}

export async function deleteTicket(id, Ticket) {
    return await Ticket.findByIdAndDelete(id);
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
        const ticketToUpdate = await Ticket.findById(ticketId);

        ticketToUpdate.items = ticketToUpdate.items.map((e) =>
            +e.article.id === +productId ? { ...e._doc, uds: e.uds + 1 } : e
        );

        await ticketToUpdate.save();

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
        (e) => +e.article.id === +productId
    );

    const thereAreOneUnit =
        ticket.items.find((e) => +e.article.id === +productId).uds === 1;

    console.log({
        ticket: ticket.items.map((e) => e.article),
        productIsInTicket,
        thereAreOneUnit,
    });

    if (productIsInTicket && thereAreOneUnit) {
        return await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $pull: { items: { 'article.id': { $eq: +productId } } },
            },
            { new: true }
        );
    } else {
        console.log('Not one');
        const ticketToUpdate = await Ticket.findById(ticketId);

        ticketToUpdate.items = ticketToUpdate.items.map((e) =>
            +e.article.id === +productId ? { ...e._doc, uds: e.uds - 1 } : e
        );

        ticketToUpdate.save();

        // await Ticket.updateOne(
        //     { 'items.article.id': productId, _id: ticketId },
        //     {
        //         $inc: {
        //             'items.$.uds': -1,
        //         },
        //     }
        // );
        console.log(await Ticket.findById(ticketId));
        return await Ticket.findById(ticketId);
    }
}
