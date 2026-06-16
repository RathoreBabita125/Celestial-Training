import { AppDataSource } from "../../../../app";
import { Task } from "../../../models/Task";
import { User } from "../../../models/User";

export const deteteUserResolvers = {
    Mutation: {
        deleteUser: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const taskRepo = AppDataSource.getRepository(Task);

            const user = await userRepo.findOne({ where: { id: userData.id } });
            if (!user) {
                throw new Error("Not Found User");
            }
            await taskRepo.delete({
                assignedTo: {
                    id: userData.id
                }
            })
            return await userRepo.remove(user);
        },
    }
}