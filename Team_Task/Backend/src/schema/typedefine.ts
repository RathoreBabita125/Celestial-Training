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
        tasks:[Task]
    }
    type Task{
        id: ID!
        title: String!
        description:String!
        status:String!
        priority:String
        assignedTo:User
        project:Project
        dueDate:String
        estimateDate:String
    }
    type AuthResponse{
        user:User
        token:String
    }
    
    type LogoutResponse{
        message:String!
    }

    type Query{
        users(
            fullName: String
            email: String
            status: String
            role: String
        ):[User]

        getMe:User

        projects(
            title:String
            status:String
            priority:String
            projectManager:String
        ):[Project]

        getProjectDetails:[Project]

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
      
        logout:LogoutResponse!  

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
            startDate:Date!
            endDate:Date!
        ):Project

        deleteProject(
            id: ID!
        ):Project
        
        createTask(
            title:String!
            description:String!
            status:String!
            priority:String!    
            projectId:ID!
            assignedTo:ID!
            dueDate:Date!
            estimateDate:Date!
        ):Task

        updateTask(
            id:ID!
            title:String!
            description:String!
            status:String!
            priority:String!
            projectId:ID!
            assignedTo:ID!
            dueDate:Date!
            estimateDate:Date!
        ):Task

        deleteTask(
            id:ID!
        ):Task
    }
`;