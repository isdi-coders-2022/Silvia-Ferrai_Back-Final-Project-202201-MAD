import express from 'express';

import {
    addAndUpdateProduct,
    deleteProduct,
} from '../controllers/ticket.controller.js';
import { createTicket, getAllTickets } from '../controllers/ticket-crud.js';

const router = express.Router();

router.post('/', createTicket);
router.patch('/:id', addAndUpdateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllTickets);

export default router;
