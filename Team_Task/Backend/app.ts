import "reflect-metadata";
import { DataSource } from "typeorm";
import express from 'express';
import dotenv from 'dotenv';
import { User } from "./src/models/User.ts";
import { Project } from "./src/models/Project.ts";
import { Task } from "./src/models/Task.ts";
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./src/controllers/resolver.ts";
import { typeDefs } from "./src/schema/typedefine.ts";
import { expressMiddleware } from "@as-integrations/express5";
import cookieParser from "cookie-parser";
import { AuthMiddleware } from "./src/middlewares/authMiddleware.ts";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));

export const AppDataSource = new DataSource({
    host: 'localhost',
    username: 'postgres',
    type: 'postgres',
    port: 5432,
    password: 'Cel%Bd@2026',
    database: 'Task Management',
    synchronize: true,
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
    await server.start();
    app.use('/graphql',
        expressMiddleware(server, {
            context: async ({ req, res}) => {
                const auth=AuthMiddleware(req, res);
                return{
                    req, 
                    res,
                    db:AppDataSource,
                    user:auth?.decoded
                }
            }
        })
    );
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
}
startServer();
