import { gql } from 'graphql-tag';
export const typeDefs = gql `
    type User{
        id: ID!
        name: String!
        email:String!
        role:String!
    }
    type Project{
        id: ID!
        title: String!
        description:String!
        status:String!
    }
    type Task{
        id: ID!
        title: String!
        description:String!
        status:String!
    }
    type AuthResponse{
        token:String!
        email:String!
    }
    type Query{
        users:[User]
        projects:[Project]
        tasks:[Task]
    }
    type Mutation{

        signup(
            name:String!
            email:String!
            password:String!
        ):AuthResponse

        login(
            email:String!
            password:String
        ):AuthResponse

        createProject(
            title:String!
            description:String!
            status:String!
        ):Project
        
        editProject(
            title:String!
            description:String!
            status:String!
        ):Project
           
        createTask(
            title:String!
            description:String!
            status:String!
            projectId:ID!
            taskId:ID!
        ):Task

        editTask(
            title:String!
            description:String!
            status:String!
            projectId:ID!
            taskId:ID!
        ):Task
    }
`;
