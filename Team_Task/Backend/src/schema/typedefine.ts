import { gql } from "graphql-tag";

export const typeDefs=gql`
    type User{
        id: ID!
        fullName: String!
        email:String!
        password:String!
        confirmPassword:String!
        role:String!
        phone:ID!
    }
    type Project{
        id: ID!
        title: String!
        description:String!
        status:String!
        message:String
    }
    type Task{
        id: ID!
        title: String!
        description:String!
        status:String!
        message:String
    }
    type AuthResponse{
        token:String
        email:String
        message:String
    }
    type Query{
        users:[User]
        projects:[Project]
        tasks:[Task]
    }
    type Mutation{
        signup(
            id:ID
            fullName:String!
            email:String!
            password:String!
            confirmPassword:String!
            role:String!
            phone:ID!
        ):AuthResponse

        login(
            email:String!
            password:String!    
        ):AuthResponse

        forgot(
            email:String!
            password:String   
        ):AuthResponse
      
        logout:String!  

        createProject(
            title:String!
            description:String!
            status:String!
        ):Project

        updateProject(
            id:ID!
            title:String!
            description:String!
            status:String!
        ):Project

        deleteProject(
            id: ID!
        ):Project
        
        createTask(
            title:String!
            description:String!
            status:String!
            projectId:ID!
            userId:ID!
        ):Task

        updateTask(
            id:ID!
            title:String!
            description:String!
            status:String!
            projectId:ID!
            userId:ID!
        ):Task

        deleteTask(
            id:ID!
        ):Task
    }
`