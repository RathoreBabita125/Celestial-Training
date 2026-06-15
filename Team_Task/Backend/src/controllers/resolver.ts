import { userResolvers } from './queryResolvers/user.ts';
import { projectResolvers } from './queryResolvers/project.ts';
import { taskResolvers } from './queryResolvers/task.ts';
import { signupResolvers } from './mutationResolvers/login/signup.ts';
import { signinResolvers } from './mutationResolvers/login/signin.ts';
import { forgetResolvers } from './mutationResolvers/login/forget.ts';
import { logoutResolvers } from './mutationResolvers/login/logout.ts';
import { addUserResolvers } from './mutationResolvers/users/addUser.ts';
import { updateUserResolvers } from './mutationResolvers/users/updateUser.ts';
import { deteteUserResolvers } from './mutationResolvers/users/deleteUser.ts';
import { addProjectResolvers } from './mutationResolvers/projects/addProject.ts';
import { updateProjectResolvers } from './mutationResolvers/projects/updateProject.ts';
import { deleteProjectResolvers } from './mutationResolvers/projects/deleteProject.ts';
import { addTaskResolvers } from './mutationResolvers/tasks/addTask.ts';
import { updateTaskResolvers } from './mutationResolvers/tasks/updateTask.ts';
import { deleteTaskResolvers } from './mutationResolvers/tasks/deleteTask.ts';

export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...projectResolvers.Query,
        ...taskResolvers.Query,
    },
    Mutation: {
        ...signupResolvers.Mutation,
        ...signinResolvers.Mutation,
        ...forgetResolvers.Mutation,
        ...logoutResolvers.Mutation,
        ...addUserResolvers.Mutation,
        ...updateUserResolvers.Mutation,
        ...deteteUserResolvers.Mutation,
        ...addProjectResolvers.Mutation,
        ...updateProjectResolvers.Mutation,
        ...deleteProjectResolvers.Mutation,
        ...addTaskResolvers.Mutation,
        ...updateTaskResolvers.Mutation,
        ...deleteTaskResolvers.Mutation,     
    }
}
