import { gql } from '@apollo/client'

export const SIGNUP = gql`
    mutation signup(
        $fullName : String!,
        $email : String!,
        $password : String!,
        $confirmPassword : String!,
        $role : String!,
        $phone : ID!
        ){
            signup(
                fullName : $fullName,
                email : $email,
                password : $password,
                confirmPassword : $confirmPassword,
                role : $role,
                phone : $phone
        ){
            token   
        }  
    } 
`;
export const LOGIN = gql`
    mutation login(
        $email:String!
        $password:String!
    ){
        login(
            email:$email
            password:$password
        ){
            token
            user{
                id
                fullName
                email
                role
            }
        }
    }
`;
export const LOGOUT = gql`
    mutation logout{
        logout{
            message
        }
    }
`
export const GETME=gql`
    query getMe{
        getMe{
            id
            fullName
            role
            email
        }
    }
`
export const GOOGLE_AUTH_MUTATION = gql`
    mutation AuthWithGoogle(
        $idToken:String
    ){
        authWithGoogle(
            idToken:$idToken
        ){
            token
            user{
                id
                email
                name
            }
        }
    }
`
export const FORGET = gql`
    mutation forget(
        $email:String!
        $password:String!
        $confirmPassword:String!
    ){
        forget(
            email:$email
            password:$password
            confirmPassword:$confirmPassword
        ){
            user{
                email
            }
        }
    }
`
export const ADDUSER = gql`
    mutation addUser( $fullName : String!,
        $email : String!,
        $password : String!,
        $role : String!,
        $phone : ID!
        ){
        addUser(
            fullName : $fullName,
            email : $email,
            password : $password,
            role : $role,
            phone : $phone
        ){
            token
        }  
    } 
`
export const UPDATEUSER = gql`
    mutation updateUser(
        $id:ID!
        $fullName:String!
        $email:String!
        $password:String!
        $role:String!
        $phone:ID!
    ){
        updateUser(
            id:$id
            fullName:$fullName
            email:$email
            password:$password
            role:$role
            phone:$phone
        ){
            token
        }
    }
`
export const DELETEUSER = gql`
    mutation deleteUser(
        $id:ID!
    ){
        deleteUser(
            id:$id
        ){
            token
        }
    }
`
export const GETUSERS = gql`
    query getUsers(
        $fullName:String
        $email:String
        $status:String
        $role:String
    ){
        users(
            fullName:$fullName
            email:$email
            status:$status
            role:$role
        ){
            id
            fullName
            email
            role
            phone
            status
            createdAt
            updatedAt
            deletedAt
        }
    }
`
export const CREATEPROJECT = gql`
    mutation createProject(
        $title:String!
        $description:String!
        $projectManager:String!
        $engineers:[String!]
        $status:String!
        $priority:String!
        $startDate:Date!
        $endDate:Date!
    ){
        createProject(
            title:$title
            description:$description
            projectManager:$projectManager
            engineers:$engineers
            status:$status
            priority:$priority
            startDate:$startDate
            endDate:$endDate
        ){
            id
            title
            description
            projectManager
            engineers
            status
            priority
            startDate
            endDate
        }
    }
`
export const GETPROJECTS = gql`
    query getProjects(
        $title:String
        $projectManager:String
        $status:String
        $priority:String
    ){
        projects(
            title:$title
            projectManager:$projectManager
            status:$status
            priority:$priority
        ){
           id
            title
            description
            projectManager
            engineers
            status
            priority
            startDate
            endDate
        }
    }
`

export const GETPROJECTDETAILS = gql`
    query getProjectDetails{
        getProjectDetails{
            id
            title
            projectManager
            endDate
            status
            priority
            tasks{
                title
                status
                assignedTo{
                    fullName
                    role
                    email
                }
            }
        }  
    }
`

export const UPDATEPROJECT = gql`
    mutation updateProject(
        $id:ID!
        $title:String!
        $description:String!
        $status:String!
        $priority:String!
    ){
        updateProject(
            id:$id
            title:$title
            description:$description
            status:$status
            priority:$priority
        ){
            id
            title
            description
            status
            priority
        }
    }
`
export const DELETEPROJECT = gql`
    mutation deleteProject(
        $id:ID!
    ){
        deleteProject(
            id:$id
        ){
            id
            title
            description
        }
    }
`
export const CREATETASK = gql`
    mutation createTask(
        $title:String!
        $description:String!
        $assignedTo:ID!
        $projectId:ID!
        $status:String!
        $priority:String!
        $dueDate:Date!
        $estimateDate:Date!
    ){
        createTask(
            title:$title
            description:$description
            assignedTo:$assignedTo
            projectId:$projectId
            status:$status
            priority:$priority
            dueDate:$dueDate
            estimateDate:$estimateDate
        ){
            title
            description
            status
            priority
            dueDate
            estimateDate
            assignedTo{
                id
                fullName
            }
            project{
                id
                title
            }
        }
    }
`

export const GETTASKS = gql`
    query getTasks{
        tasks{
            id
            title
            description
            status
            priority
            dueDate
            estimateDate
            assignedTo{
                id
                fullName
            }
            project{
                id
                title
            }
        }
    }
`
export const UPDATETASK = gql`
    mutation updateTask(
        $id:ID!
        $title:String!
        $description:String!
        $status:String!
        $priority:String!
        $assignedTo:ID!
        $projectId:ID!
        $dueDate:Date!
        $estimateDate:Date!
        ){
        updateTask(
            id:$id
            title:$title
            description:$description
            assignedTo:$assignedTo
            projectId:$projectId
            status:$status
            priority:$priority
            dueDate:$dueDate
            estimateDate:$estimateDate
        ){
            id
            title
            description
            status
            priority
            assignedTo{
                id
                fullName
            }
            project{
                id
                title
            }
        }
    }
`

export const DELETETASK = gql`
    mutation deleteTask(
        $id:ID!
    ){
        deleteTask(
            id:$id
        ){
            id
        }
    }
`



