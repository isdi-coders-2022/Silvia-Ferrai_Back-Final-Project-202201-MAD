import { User } from '../models/user.model.js';
import { createError } from '../services/errors.js';

export const waiterRequired = async (req, res, next) => {
    const user = await User.findById(req.tokenPayload.id);
    console.log(req.tokenPayload);
    if (user.role !== 'Sala' && user) {
        next(createError(new Error('Unauthorized'), 403));
    } else {
        next();
    }
};
