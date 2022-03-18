import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../services/auth.js';

export const userLogin = async (req, resp, next) => {
    const user = req.body;
    const loginError = new Error('user or password invalid');
    loginError.status = 401;
    if (!user.username || !user.password) {
        next(loginError);
    } else {
        const userFound = await User.findOne({
            username: user.username,
        });

        if (!userFound) {
            next(loginError);
        } else if (!bcrypt.compareSync(user.password, userFound.password)) {
            next(loginError);
        } else {
            const token = createToken({
                username: userFound.username,
                id: userFound.id,
            });
            console.log(token);
            resp.json({
                token,
                username: userFound.username,
                id: userFound.id,
            });
        }
    }
};
