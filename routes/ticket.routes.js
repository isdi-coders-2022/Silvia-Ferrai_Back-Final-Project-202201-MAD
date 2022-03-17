import express from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { waiterRequired } from '../middlewares/waiterRequired.js';
import {
    addAndUpdateProduct,
    addNewTicket,
    deleteProduct,
    getAllTickets,
    getTicket,
} from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/', loginRequired, addNewTicket);
router.patch('/:id', loginRequired, addAndUpdateProduct);
router.delete('/:id', loginRequired, deleteProduct);
router.get('/', loginRequired, getAllTickets);
router.get('/:id', loginRequired, waiterRequired, getTicket);

export default router;
