import { AppDataSource } from '../../../app';
import { User } from '../../models/User';

export const userResolvers = {
    Query: {
        users: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const where: any = {}
            if (userData.fullName) {
                where.fullName = userData.fullName;
            }
            if (userData.email) {
                where.email = userData.email;
            }
            if (userData.role) {
                where.role = userData.role;
            }
            if (userData.status) {
                where.status = userData.status;
            }
            return await userRepo.find({ where })
        },
        
        getMe: async (_: any, __: any, context: any) => {
            try {
                 console.log(context.user)
                if (!context.user) {
                    return null
                }
                const userRepo = AppDataSource.getRepository(User);
                const user = await userRepo.findOne({
                    where: {
                        id:Number(context.user.id)
                    }
                });
                return user          
            } catch (error) {
                return null;
            }
        }
    }
}