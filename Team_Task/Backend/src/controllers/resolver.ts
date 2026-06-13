import bcrypt from 'bcrypt';
import { AppDataSource } from '../../app.ts';
import { User } from '../models/User.ts';
import { Project } from '../models/Project.ts';
import { Task } from '../models/Task.ts';
import { generateTokens } from '../utils/token.ts';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || 'My-Secret-Key'
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const resolvers = {
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

        projects: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const where: any = {}
            if (projectData.title) {
                where.title = projectData.title;
            }
            if (projectData.status) {
                where.status = projectData.status;
            }
            if (projectData.priority) {
                where.priority = projectData.priority;
            }
            if (projectData.status) {
                where.projectManager = projectData.projectManager;
            }
            return await projectRepo.find({ where })
        },

        getProjectDetails: async () => {
            const projectRepo = AppDataSource.getRepository(Project);
            return await projectRepo.find({
                relations: {
                    tasks: true
                }
            })
        },

        tasks: async () => {
            return await AppDataSource.getRepository(Task).find();
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
                console.log("db user", user)
                return user
                
            } catch (error) {
                return null;
            }
        }
    },
    Mutation: {
        signup: async (_: any, userData: any) => {
            const findUser = await AppDataSource.getRepository(User).findOne({ where: { email: userData.email } });
            const nameField = /^[A-Za-z ]*$/;
            const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            const phoneField = /^[6-9]\d{9}$/;

            //name
            if (!userData.fullName || userData.fullName.trim() === "") {
                throw new Error("Name is required");
            }
            else if (!nameField.test(userData.fullName)) {
                throw new Error("Only letters and space are allow");
            }

            //email
            if (!userData.email || userData.email.trim() === "") {
                throw new Error("Email is required");
            }
            else if (!emailField.test(userData.email)) {
                throw new Error("Please enter valid email");
            }

            //password
            if (!userData.password || userData.password === "") {
                throw new Error("Password is required");
            }
            else if (!passwordField.test(userData.password)) {
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

            //confirm password
            if (!userData.password || userData.password === "") {
                throw new Error("Confirm password is required");
            }
            else if (userData.password != userData.confirmPassword) {
                throw new Error("Password does not match");
            }

            //phone
            if (!userData.phone || userData.phone === "") {
                throw new Error("Phone number is required");
            }
            else if (!phoneField.test(userData.phone)) {
                throw new Error("Enter 10 valid digits contact number");
            }

            //role
            if (!userData.role || userData.role.trim() === "") {
                throw new Error("Role field is required");
            }

            if (findUser) {
                return {
                    email: userData.email,
                    message: "You are already existed. Please login"
                }
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

        login: async (_: any, userData: any, context: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            const user = await userRepo.findOne({ where: { email: userData.email } });

            //email
            if (!userData.email || userData.email.trim() === "") {
                throw new Error("Email is required");
            }
            else if (!emailField.test(userData.email)) {
                throw new Error("Please enter valid email");
            };

            //password
            if (!userData.password || userData.password === "") {
                throw new Error("Password is required");
            }
            else if (!passwordField.test(userData.password)) {
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            };

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
        },

        forget: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });

            //password
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            if (!userData.password || userData.password?.trim() === "" || !userData.confirmPassword || userData.confirPassword?.trim() === "") {
                throw new Error("This field is required");
            }
            if (!passwordField.test(userData.password)) {
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

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

        logout: async (_: any, __: any, context: any) => {
            context.res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            return "Successfully logged out!"
        },

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
        },

        addUser: async (_: any, userData: any) => {
            const nameField = /^[A-Za-z ]*$/;
            const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            const phoneField = /^[6-9]\d{9}$/;

            //name
            if (!userData.fullName || userData.fullName.trim() === "") {
                throw new Error("Name is required");
            }
            else if (!nameField.test(userData.fullName)) {
                throw new Error("Only letters and space are allow");
            }

            //email
            if (!userData.email || userData.email.trim() === "") {
                throw new Error("Email is required");
            }
            else if (!emailField.test(userData.email)) {
                throw new Error("Please enter valid email");
            }

            //password
            if (!userData.password || userData.password === "") {
                throw new Error("Password is required");
            }
            else if (!passwordField.test(userData.password)) {
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

            //phone
            if (!userData.phone || userData.phone === "") {
                throw new Error("Phone number is required");
            }
            else if (!phoneField.test(userData.phone)) {
                throw new Error("Enter 10 valid digits contact number");
            }

            //role
            if (!userData.role || userData.role.trim() === "") {
                throw new Error("Role field is required");
            }

            const findUser = await AppDataSource.getRepository(User).findOne({ where: { email: userData.email } });
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

        updateUser: async (_: any, userData: any) => {
            const nameField = /^[A-Za-z ]*$/;
            const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            const phoneField = /^[6-9]\d{9}$/;

            //name
            if (!userData.fullName || userData.fullName.trim() === "") {
                throw new Error("Name is required");
            }
            else if (!nameField.test(userData.fullName)) {
                throw new Error("Only letters and space are allow");
            }

            //email
            if (!userData.email || userData.email.trim() === "") {
                throw new Error("Email is required");
            }
            else if (!emailField.test(userData.email)) {
                throw new Error("Please enter valid email");
            }

            //password
            if (!userData.password || userData.password === "") {
                throw new Error("Password is required");
            }
            else if (!passwordField.test(userData.password)) {
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

            //phone
            if (!userData.phone || userData.phone === "") {
                throw new Error("Phone number is required");
            }
            else if (!phoneField.test(userData.phone)) {
                throw new Error("Enter 10 valid digits contact number");
            }

            //role
            if (!userData.role || userData.role.trim() === "") {
                throw new Error("Role field is required");
            }

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({
                where: {
                    id: userData.id
                }
            })
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

        deleteUser: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { id: userData.id } });
            if (!user) {
                throw new Error("Not Found User");
            }
            return await userRepo.remove(user);
        },

        createProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);

            if (!projectData.title || projectData.title.trim() === "") {
                throw new Error('Please enter project name.');
            }
            if (!projectData.description || projectData.description.trim() === "") {
                throw new Error('Please enter project description');
            }
            if (!projectData.status) {
                throw new Error('Status Field is required');
            }
            if (!projectData.priority) {
                throw new Error('Priority field is required');
            }
            const project = await projectRepo.create(
                {
                    title: projectData.title,
                    description: projectData.description,
                    projectManager: projectData.projectManager,
                    engineers: projectData.engineers,
                    status: projectData.status,
                    priority: projectData.priority,
                    startDate: projectData.startDate,
                    endDate: projectData.endDate,
                }
            );
            return await projectRepo.save(project);
        },

        updateProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } })

            if (!projectData.title || projectData.title.trim() === "") {
                throw new Error('Please enter title name.');
            }
            if (!projectData.description || projectData.description.trim() === "") {
                throw new Error('Please enter description');
            }
            if (!projectData.status) {
                throw new Error('Status Field is required');
            }
            if (!projectData.priority) {
                throw new Error('priority field is required');
            }

            if (!project) {
                throw "Project is not found";
            }
            if (projectData.title != undefined) {
                project.title = projectData.title;
            }
            if (projectData.discription != undefined) {
                project.description = projectData.description;
            }
            if (projectData.status != undefined) {
                project.status = projectData.status;
            }
            if (projectData.priority != undefined) {
                project.priority = projectData.priority;
            }
            return await projectRepo.save(project);
        },

        deleteProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } });
            if (!project) {
                throw new Error("Not Found Project");
            }
            await projectRepo.delete(project.id);
            return project;
        },

        createTask: async (_: any, taskData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const projectRepo = AppDataSource.getRepository(Project);
            const taskRepo = AppDataSource.getRepository(Task);

            if (!taskData.title || taskData.title.trim() === "") {
                throw new Error('Please enter task name.');
            }
            if (!taskData.description || taskData.description.trim() === "") {
                throw new Error('Please enter task description.');
            }
            if (!taskData.status) {
                throw new Error('Please provide the status of the task.');
            }
            if (!taskData.priority) {
                throw new Error('Please provide the priority of the task.');
            }

            const user = await userRepo.findOne({ where: { id: Number(taskData.assignedTo) } });
            const project = await projectRepo.findOne({ where: { id: Number(taskData.projectId) } });

            if (!user || !project) {
                throw new Error("User or Project not found");
            }
            const task = taskRepo.create({
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                assignedTo: user,
                project: project,
                dueDate: taskData.dueDate,
                estimateDate: taskData.estimateDate
            });
            return await taskRepo.save(task);
        },

        updateTask: async (_: any, taskData: any) => {
            if (!taskData.id) {
                throw new Error("Task id is required");
            }
            const taskRepo = AppDataSource.getRepository(Task);
            const task = await taskRepo.findOne({
                where: { id: taskData.id },
                relations: {
                    assignedTo: true,
                    project: true,
                },
            });

            if (!taskData.title || taskData.title.trim() === "") {
                throw new Error('Please enter title name.');
            }
            if (!taskData.description || taskData.description.trim() === "") {
                throw new Error('Please enter description');
            }
            if (!taskData.status) {
                throw new Error('Please provide the status of the task');
            }
            if (!taskData.priority) {
                throw new Error('Please provide the status of the task');
            }
            if (!taskData.projectId) {
                throw new Error('Please provide project id for the task');
            }
            if (!taskData.assignedTo) {
                throw new Error('Please provide user id for the task');
            }

            if (!task) {
                throw new Error("Task Not Found");
            }
            if (taskData.title !== undefined) {
                task.title = taskData.title;
            }
            if (taskData.description !== undefined) {
                task.description = taskData.description;
            }
            if (taskData.status !== undefined) {
                task.status = taskData.status;
            }
            if (taskData.priority !== undefined) {
                task.priority = taskData.priority;
            }
            if (taskData.assignedTo !== undefined) {
                task.assignedTo = taskData.assignedTo;
            }
            if (taskData.projectId !== undefined) {
                task.project = taskData.projectId;
            }
            if (taskData.dueDate !== undefined) {
                task.dueDate = taskData.dueDate;
            }
            if (taskData.estimateDate !== undefined) {
                task.estimateDate = taskData.estimateDate;
            }

            await taskRepo.save(task);
            const updatedTask = await taskRepo.findOne({
                where: { id: task.id },
                relations: {
                    assignedTo: true,
                    project: true,
                },
            });
            return updatedTask;
        },

        deleteTask: async (_: any, taskData: any) => {
            const taskRepo = AppDataSource.getRepository(Task);
            const task = await taskRepo.findOne({ where: { id: taskData.id } });
            if (!task) {
                throw new Error("Task does not Exist");
            }
            const deletedTask = { ...task };
            await taskRepo.remove(task);
            return deletedTask;
        },
    }
}
