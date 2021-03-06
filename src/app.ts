import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import 'reflect-metadata';
import createConnection from "./database";
import { appError } from './errors/AppErro';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof appError) {
            return response.status(err.statusCode).json({
                message: err.message
            })
        }

        return response.status(500).json({
            status: "Error"
        })
    })

export { app };