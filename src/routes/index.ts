import express from 'express';

import authRouter from './auth.router';
import userRouter from './user.router';

const appRoutes = express.Router();

appRoutes.use('/auth', authRouter);
appRoutes.use('/users', userRouter);

export default appRoutes;