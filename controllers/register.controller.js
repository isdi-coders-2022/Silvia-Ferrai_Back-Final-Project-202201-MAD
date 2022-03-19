import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { createError } from '../services/errors.js';

export const userRegister = async (req, resp, next) => {
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password);
        const userData = { ...req.body, password: encryptedPassword };
        const newUser = await User.create(userData);
        resp.json(newUser);
    } catch (error) {
        next(createError(error, 500));
    }
};
