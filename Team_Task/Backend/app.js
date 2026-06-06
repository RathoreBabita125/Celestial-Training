import { DataSource } from "typeorm";
import express from 'express';
import dotenv from 'dotenv';
import { User } from "./src/entities/User.js";
import { Project } from "./src/entities/Project.js";
import { Task } from "./src/entities/Task.js";
import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./src/resolvers/resolver.js";
import { typeDefs } from "./src/schema/typedefine.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());

export const AppDataSource = new DataSource({
    host: 'localhost',
    username: 'postgres',
    type: 'postgres',
    port: 5432,
    password: 'Cel%Bd@2026',
    database: 'Task Management',
    synchronize: true,
    logging: true,
    entities: [User, Project, Task]
});

const startServer = async () => {
    AppDataSource.initialize()
        .then(() => {
            console.log('Database is connected successfully');
            app.listen(PORT, () => {
                console.log(`Server is running at port: ${PORT}`);
            });
        })
        .catch((err) => {
            console.log('Connection Failed:', err);
        });
    const server = new ApolloServer({
        typeDefs,
        resolvers: resolvers(),
    });
    await server.start();
};
startServer();
