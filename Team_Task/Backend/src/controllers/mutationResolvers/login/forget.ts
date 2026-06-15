import { AppDataSource } from "../../../../app";
import { validateUserInput } from "../../../common/userValidate";
import { User } from '../../../models/User';
import bcrypt from 'bcrypt';

export const forgetResolvers = {
    Mutation: {
        forget: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });
            const inputFields:string[]=["email", "password", "confirmPassword"];                                    
            validateUserInput(userData, inputFields);
               
            if (!user) {
                throw new Error("User Not Found");
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            user.password = hashedPassword;
            await userRepo.save(user);
            return {
                user
            }
        },
    }
}
