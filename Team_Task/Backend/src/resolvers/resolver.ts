import bcrypt from 'bcrypt';
import { AppDataSource } from '../../app.ts';
import { User } from '../entities/User.ts';
import { Project } from '../entities/Project.ts';
import { Task } from '../entities/Task.ts';
import { generateTokens } from '../utils/token.ts';


export const resolvers = {
    Query: {
        users: async () => {
            return await AppDataSource.getRepository(User).find();
        },
        projects: async () => {
            return await AppDataSource.getRepository(Project).find();
        },
        tasks: async () => {
            return await AppDataSource.getRepository(Task).find();
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
            else if(!nameField.test(userData.fullName)){
                throw new Error("Only letters and space are allow");
            }

            //email
            if (!userData.email || userData.email.trim() === "") {
                throw new Error("Email is required");
            }
            else if(!emailField.test(userData.email)){
                throw new Error("Please enter valid email");
            }

            //password
            if(!userData.password || userData.password===""){
                throw new Error("Password is required");
            }
            else if(!passwordField.test(userData.password)){
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

            //confirm password
            if(!userData.password || userData.password===""){
                throw new Error("Confirm password is required");
            }
            else if(userData.password!=userData.confirmPassword){
                throw new Error("Password does not match")
            }

            //phone
            if(!userData.phone || userData.phone===""){
                throw new Error("Phone number is required");
            }
            else if(!phoneField.test(userData.phone)){
                throw new Error("Enter 10 valid digits contact number");
            }

            //role
            if(!userData.role || userData.role.trim()===""){
                throw new Error("Role field is required");
            }

            if (findUser) {
                console.log(`you are already existed: ${userData.fullName} you can login.`);
                return {
                    email:userData.email,
                    message:"You are already existed. Please login"
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
                user,   
                message: `Congratulation! ${(user.fullName).toUpperCase()}, You have successfully signed up.`
            };
        },

        login: async (_: any, userData: any, context:any) => {
            const userRepo = AppDataSource.getRepository(User);
            const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            const user = await userRepo.findOne({ where: { email: userData.email } });

            //email
            if (!userData.email || userData.email.trim() === "") {
                throw new Error("Email is required");
            }
            if(!emailField.test(userData.email)){
                throw new Error("Please enter valid email");
            }

            //password
            if(!userData.password || userData.password===""){
                throw new Error("Password is required");
            }
            if(!passwordField.test(userData.password)){
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

            if (!user) {
                throw new Error("Invalid Credentials");
            }
    
            const validUser = await bcrypt.compare(userData.password, user.password);
            
            if (!validUser) {
                throw new Error("Email or password does not exist");
            }

            const token = generateTokens(user.id);
            context.res.cookie("token", token, {
                httpOnly:true
            });
            return {
                token,
                message: `Welcome Back! You are loggined now`,
                user
            }
        },

        forgot: async (_: any, userData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });

            //password
            const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
            if(!userData.password || userData.password===""){
                throw new Error("Password is required");
            }
            if(!passwordField.test(userData.password)){
                throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
            }

            if (!user) {
                throw new Error("User Not Found");
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            user.password = hashedPassword;
            await userRepo.save(user);

            return {
                message: "You have successfully updated password"
            }

        },

        logout: async (_:any, __:any, context:any) => {
            context.res.clearCokkie("token",{httpOnly:true})
            return "You have successfully logged out"
        },

        createProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);

            if(!projectData.title || projectData.title.trim()===""){
                throw new Error('Please enter title name.')
            }
            if(!projectData.description || projectData.description.trim()===""){
                throw new Error('Please enter description')
            }
            if(!projectData.status || projectData.status.trim()===""){
                throw new Error('Give status of the project')
            }
            const project = await projectRepo.create(
                {
                    title: projectData.title,
                    description: projectData.description,
                    status: projectData.status
                }
            )
            return await projectRepo.save(project);
        },

        updateProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } })

            if(!projectData.title || projectData.title.trim()===""){
                throw new Error('Please enter title name.')
            }
            if(!projectData.description || projectData.description.trim()===""){
                throw new Error('Please enter description')
            }
            if(!projectData.status || projectData.status.trim()===""){
                throw new Error('Give status of the project')
            }

            if (!project) {
                throw "Project is not found";
            }
            if (projectData.title != undefined) {
                project.title = projectData.title
            }
            if (projectData.discription != undefined) {
                project.description = projectData.description
            }
            if (projectData.status != undefined) {
                project.status = projectData.status
            }
            return await projectRepo.save(project)
        },

        deleteProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } });
            if (!project) {
                throw new Error("Not Found Project")
            }
            await projectRepo.remove(project);
            return {
                message: "Project is deleted successfully"
            }
        },

        createTask: async (_: any, taskData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const projectRepo = AppDataSource.getRepository(Project);
            const taskRepo = AppDataSource.getRepository(Task);

            if(!taskData.title || taskData.title.trim()===""){
                throw new Error('Please enter title name.')
            }
            if(!taskData.description || taskData.description.trim()===""){
                throw new Error('Please enter description')
            }
            if(!taskData.status || taskData.status.trim()===""){
                throw new Error('Please provide the status of the task')
            }
            if(!taskData.projectId){
                throw new Error('Please provide project id for the task')
            }
            if(!taskData.userId){
                throw new Error('Please provide user id for the task')
            }
            

            const user = await userRepo.findOne({ where: { id: Number(taskData.userId) } });
            const project = await projectRepo.findOne({ where: { id: Number(taskData.projectId) } });

            if (!user || !project) {
                throw new Error("User or Project not found");
            }

            const task = taskRepo.create({
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                assignedTo: user,
                project: project
            });

            return await taskRepo.save(task);
        },

        updateTask: async (_: any, taskData: any) => {
            if (!taskData.id) {
                throw new Error("Task id is required");
            }
            const taskRepo = AppDataSource.getRepository(Task);
            const task = await taskRepo.findOne({ where: { id: taskData.id } });

            if(!taskData.title || taskData.title.trim()===""){
                throw new Error('Please enter title name.')
            }
            if(!taskData.description || taskData.description.trim()===""){
                throw new Error('Please enter description')
            }
            if(!taskData.status || taskData.status.trim()===""){
                throw new Error('Please provide the status of the task')
            }
            if(!taskData.projectId){
                throw new Error('Please provide project id for the task')
            }
            if(!taskData.userId){
                throw new Error('Please provide user id for the task')
            }

            if (!task) {
                throw new Error("Task Not Found")
            }
            if (taskData.title !== undefined) {
                task.title = taskData.title;
            }
            if (taskData.description !== undefined) {
                task.description = taskData.description
            }
            if (taskData.status !== undefined) {
                task.status = taskData.status
            }

            return await taskRepo.save(task)
        },

        deleteTask: async (_: any, taskData: any) => {
            const taskRepo = AppDataSource.getRepository(Task);
            const task = await taskRepo.findOne({ where: { id: taskData.id } });
            if (!task) {
                throw new Error("Task does not Exist")
            }
            await taskRepo.remove(task);
            return {
                message: "Task is deleted successfully"
            }
        },
    }
}