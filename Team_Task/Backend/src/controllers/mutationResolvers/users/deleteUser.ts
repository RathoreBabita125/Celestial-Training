import { AppDataSource } from "../../../../app";
import { User } from "../../../models/User";

export const deteteUserResolvers = {
    Mutation: {
        deleteUser: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { id: userData.id } });
            if (!user) {
                throw new Error("Not Found User");
            }
            return await userRepo.remove(user);
        },
    }
}