import bcrypt from 'bcrypt';
import { AppDataSource } from "../../app.js";
import { User } from '../entities/User.js';
import { Project } from '../entities/Project.js';
import { Task } from '../entities/Task.js';
import { generateTokens } from "../utils/token.js";
export const resolvers = () => {
    Query: {
        users: async () => {
            return await AppDataSource.getRepository(User).find();
        };
        projects: async () => {
            return await AppDataSource.getRepository(Project).find();
        };
        tasks: async () => {
            return await AppDataSource.getRepository(Task).find();
        };
        
    }
    Mutation: {
        signup: async (_, userData) => {
            const findUser = await AppDataSource.getRepository(User).findOne({ where: { email: userData.email } });
            if (findUser) {
                throw "you are already existed: You can you login";
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const userRepo = AppDataSource.getRepository(User);
            const user = userRepo
                .create({
                id: userData.id,
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                phone: userData.phone
            });
            await userRepo.save(user);
            const token = generateTokens(user.id);
            console.log("Congratulation! You have successfully signed up.");
            return { token, user };
        };
        login: async (_, userData) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.find({ where: { email: userData.email } });
            if (!user) {
                throw "Invalid credentials";
            }
            const token = generateTokens(user.id);
            const validUser = await bcrypt.compare(user.password, userData.password);
            if (!validUser) {
                throw "Email and password does not exist";
            }
            console.log("You are now logged in.");
            return { token, user };
        };
        createProject: async (_, projectData) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = projectRepo.create({
                title: projectData.title,
                description: projectData.description,
                status: projectData.status
            });
            await projectRepo.save(project);
        };
        createTask: async (_, taskData) => {
            const userRepo = AppDataSource.getRepository(User);
            const projectRepo = AppDataSource.getRepository(Project);
            const taskRepo = AppDataSource.getRepository(Task);
            const user = await userRepo.find({ where: { id: taskData.userId } });
            const project = await projectRepo.find({ where: { id: taskData.projectId } });
            if (!user || !project) {
                throw "User or Project not found";
            }
            const task = taskRepo.create({
                title: taskData.title,
                description: taskData.description,
                assignedTo: user,
                project: project
            });
            return await taskRepo.save(task);
        };
    }
};
