import express from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { waiterRequired } from '../middlewares/waiterRequired.js';
import {
    addAndUpdateProduct,
    addNewTicket,
    deleteProduct,
    deleteTicket,
    getAllTickets,
    getProducts,
    getTicket,
} from '../controllers/ticket.controller.js';

const router = express.Router();

router.get('/product', getProducts);
router.post('/', loginRequired, waiterRequired, addNewTicket);
router.delete('/:id', loginRequired, waiterRequired, deleteTicket);
router.patch(
    '/product/:id',
    loginRequired,
    waiterRequired,
    addAndUpdateProduct
);
router.delete('/product/:id', loginRequired, waiterRequired, deleteProduct);
router.get('/', loginRequired, getAllTickets);
router.get('/:id', loginRequired, waiterRequired, getTicket);

export default router;
