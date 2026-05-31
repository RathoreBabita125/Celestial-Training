import "reflect-metadata";
import { DataSource } from "typeorm";
import express from 'express'
import dotenv from 'dotenv'
import { User } from "./src/entities/User.ts";
import { Project } from "./src/entities/Project.ts";
import { Task } from "./src/entities/Task.ts";
import cors from 'cors'
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./src/resolvers/resolver.ts";
import { typeDefs } from "./src/schema/typedefine.ts";
import { expressMiddleware } from "@as-integrations/express5";
import { AuthMiddleware } from "./src/middleware/authMiddleware.ts";
import cookieParser from "cookie-parser";

dotenv.config()

const PORT = process.env.PORT || 3000;
console.log(PORT);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

export const AppDataSource = new DataSource({
    host: 'localhost',
    username: 'postgres',
    type: 'postgres',
    port: 5432,
    password: 'Cel%Bd@2026',
    database: 'Task Management',
    synchronize: true,
    // logging: true,
    entities: [User, Project, Task]
});


const startServer = async () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database is connected successfully');
        })
        .catch((err) => {
            console.log('Connection Failed:', err);
        })

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start()

    app.get('/', (req, res) => {
        res.send('Hi This is My Home')
    })

    app.use('/graphql',
        expressMiddleware(server, {
            context: async ({ req, res }) => ({
                req, res
            })
        }))

    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    })
}
startServer()

