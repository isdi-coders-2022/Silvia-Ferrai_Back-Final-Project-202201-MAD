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

router.get('/products', getProducts);

router.post('/', loginRequired, waiterRequired, addNewTicket);
router.get('/', getAllTickets);
router.get('/:id', loginRequired, waiterRequired, getTicket);
router.delete('/:id', loginRequired, waiterRequired, deleteTicket);
router.patch(
    '/product/:id',
    loginRequired,
    waiterRequired,
    addAndUpdateProduct
);
router.delete(
    '/product/:id/id/:productId',
    loginRequired,
    waiterRequired,
    deleteProduct
);

export default router;
