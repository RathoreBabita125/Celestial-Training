import { AppDataSource } from "../../../../app";
import { User } from '../../../models/User';
import bcrypt from 'bcrypt';
import { generateTokens } from "../../../utils/token";
import { validateUserInput } from "../../../common/userValidate";

export const signinResolvers = {
    Mutation: {
        login: async (_: any, userData: any, context: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });
            const inputFields: string[] = ["email", "password"];
            validateUserInput(userData, inputFields);

            if (!user) {
                throw new Error("Invalid Credentials");
            };

            const validUser = await bcrypt.compare(userData.password, user.password);
            if (!validUser) {
                throw new Error("Email or password does not exist");
            };
            const token = generateTokens({ id: user.id, role: user.role });
            context.res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            return {
                user,
                token
            };
        }
    }
}
