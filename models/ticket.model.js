import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    items: [
        {
            uds: { type: Number, required: false },
            article: {
                type: Object,
                required: false,
            },
        },
    ],
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
