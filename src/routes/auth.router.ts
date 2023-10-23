import express from 'express';

import { login, loginValidator } from 'controllers/auth';

// import {authController} from 'controllers';

const authRouter = express.Router();

authRouter.post('/login', loginValidator(), login);

export default authRouter;
