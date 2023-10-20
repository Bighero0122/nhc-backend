import {json as bodyParserJSON} from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, {Express} from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../../swagger.json';

import { ROUTE_VERSION } from 'config';

import { MESSAGES } from 'consts';

import { errorHandlerMiddleware, requestLoggerMiddleware } from 'middlewares';

import appRoutes from 'routes';

const port = process.env.PORT || 3001;

const backendSetup = (app:Express) => {
    app.use(express.json());
    app.use(cors());
    app.use(bodyParserJSON());
    app.use(requestLoggerMiddleware);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/health', function (req, res) {
        res.send('OK');
    });
    app.use(`/api/${ROUTE_VERSION}`, appRoutes);
    app.use(errorHandlerMiddleware);

    app.listen(port, () => {
        console.info(`${MESSAGES.SERVER_RUN_SUCCESS} on ${port}`);
    });
}

export default backendSetup;