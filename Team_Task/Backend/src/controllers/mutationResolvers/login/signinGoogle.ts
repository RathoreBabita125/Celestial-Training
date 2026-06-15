import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'My-Secret-Key'
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const logoutResolvers = {
    Mutation: {
        authWithGoogle: async (_: any, { token }: { token: string }, { db }: { db: any }) => {
            try {
                const ticket = await googleClient.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                
                if (!payload || !payload.email_verified) {
                    throw new Error("Unverified email");
                }

                const { email, name, picture } = payload
                let user = await db.user.findUnique({ where: { email } });

                if (!user) {
                    user = await db.user.create({
                        data: {
                            email,
                            name,
                            url: picture
                        },
                    });
                } 
                const appToken = jwt.sign(
                    {
                        userId: user.id,
                        email: user.email
                    },
                    PRIVATE_KEY,
                    {
                        expiresIn: '7d'
                    }
                );
                return {
                    token: appToken,
                    user
                };
            } catch (error) {
                throw new Error('Authentication failed');
            }
        }
    }
}
 