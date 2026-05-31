import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const generateTokens = (id) => {
    let token = jwt.sign({ id }, PRIVATE_KEY, {
        expiresIn: '1d'
    });
    return token;
};
