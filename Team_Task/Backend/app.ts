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
import session from 'express-session';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.PRIVATE_KEY || "My-Secret-Key";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

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

    app.use(
        session({
            secret: secretKey,
            resave: false,
            saveUninitialized: true
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: 'http://localhost:5000/auth/google/callback',
            },
            (accessToken, refreshToken, profile: any, done: any) => {
                return done(null, profile)
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user: User, done) => done(null, user));

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] })
    );
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/signin' }),
        function (req, res) {
            res.redirect('/');
        }
    );
    app.use('/graphql',
        expressMiddleware(server, {
            context: async ({ req, res }) => ({
                req, 
                res,
                db:AppDataSource
            })
        })
    );
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
}
startServer();

