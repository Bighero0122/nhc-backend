import express from 'express';

import {backendSetup, databaseSetup} from './setup';

const app = express();

databaseSetup(() => {
    backendSetup(app);
});