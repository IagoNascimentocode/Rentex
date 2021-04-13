import express, { NextFunction, Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm'

import "@shared/container"

import 'express-async-errors';

createConnection()

import { router } from './routes';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';


const app = express();

app.use(express.json())

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });

    };

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(3333, () => {
    console.log("Server Run");
});
