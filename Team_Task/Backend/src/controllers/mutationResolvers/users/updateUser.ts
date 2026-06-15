import { AppDataSource } from "../../../../app";
import { validateUserInput } from "../../../common/userValidate";
import { User } from "../../../models/User";

export const updateUserResolvers = {
    Mutation: {
        updateUser: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({where: {id: userData.id} });
            const inputFields: string[] = ["fullName", "email", "password", "phone", "role"];
            validateUserInput(userData, inputFields);

            if (!user) {
                throw new Error("User does not exist");
            }
            user.fullName = userData.fullName;
            user.email = userData.email;
            user.password = userData.password;
            user.role = userData.role;
            user.phone = userData.phone;
            return await userRepo.save(user);
        },
    }
}