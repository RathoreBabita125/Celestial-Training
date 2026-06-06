import { gql } from "graphql-tag";

export const typeDefs=gql`

    enum UserStatus{
        ACTIVE
        INACTIVE
        BLOCKED
    }
    scalar Date
    type User{
        id: ID!
        fullName: String!
        email:String!
        password:String!
        confirmPassword:String!
        role:String!
        phone:ID!
        status:UserStatus!
        createdAt:Date!
        updatedAt:Date!
        deletedAt:Date
    }
    type Project{
        id: ID!
        title: String!
        projectManager:String!
        engineers:[String!]
        description:String!
        status:String!
        priority:String!
        startDate:Date!
        endDate:Date!
    }
    type Task{
        id: ID!
        title: String!
        description:String!
        status:String!
        message:String
        user:User
        project:Project
    }
    type AuthResponse{
        user:User
        token:String
    }
    type Query{
        users:[User]
        projects(
            title:String
            status:String
            priority:String
            projectManager:String
        ):[Project]
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

        forget(
            email:String!
            password:String!
            confirmPassword:String!
        ):AuthResponse
      
        logout:String!  

        authWithGoogle(
            token:String!
        ):AuthResponse

        addUser(
            id:ID
            fullName:String!
            email:String!
            password:String!
            role:String!
            phone:ID!
        ):AuthResponse

        updateUser(
            id:ID
            fullName:String!
            email:String!
            password:String!
            role:String!
            phone:ID!
        ):AuthResponse

        deleteUser(
            id:ID
        ):AuthResponse

        createProject(
            title:String!
            description:String!
            projectManager:String!
            engineers:[String!]
            status:String!
            priority:String!
            startDate:Date!
            endDate:Date!
        ):Project

        updateProject(
            id:ID
            title:String
            description:String
            status:String
            priority:String
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
`;