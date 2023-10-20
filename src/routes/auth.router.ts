import { login, loginValidator } from 'controllers/auth';
import express from 'express';

// import {authController} from 'controllers';

const authRouter = express.Router();

authRouter.post(
    '/',
    loginValidator(),
    login
)

export default authRouter;