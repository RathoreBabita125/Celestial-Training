import jwt from 'jsonwebtoken';
export const AuthMiddleware = (req, res) => {
    const authHeader = req.headers.autherization;
    if (!authHeader) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    return decoded;
};
