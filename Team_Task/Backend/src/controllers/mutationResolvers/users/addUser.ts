import { AppDataSource } from '../../../../app';
import { validateUserInput } from '../../../common/userValidate';
import { User } from '../../../models/User';
import bcrypt from 'bcrypt';

export const addUserResolvers = {
    Mutation: {
        addUser: async (_: any, userData: any) => {
            const findUser = await AppDataSource.getRepository(User).findOne({ where: { email: userData.email } });
            const inputFields:string[]=["fullName", "email", "password", "phone", "role"];
            validateUserInput(userData, inputFields);

            if (findUser) {
                throw new Error(`You are already existed.`);
            }   
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const userRepo = AppDataSource.getRepository(User);
            const user = userRepo
                .create({
                    id: userData.id,
                    fullName: userData.fullName,
                    email: userData.email,
                    password: hashedPassword,
                    role: userData.role,
                    phone: userData.phone
                });
            await userRepo.save(user);
            return {
                user
            };
        },
    }
}  