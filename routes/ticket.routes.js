import express from 'express';

import {
    addAndUpdateProduct,
    addNewTicket,
    deleteProduct,
    getAllTickets,
    getTicket,
} from '../controllers/ticket.controller.js';
const router = express.Router();

router.post('/', addNewTicket);
router.patch('/:id', addAndUpdateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllTickets);
router.get('/:id', getTicket);

export default router;
