import express from 'express';
import { userController } from 'controllers';

import { checkAuth } from 'utils';

const userRouter = express.Router();

userRouter.get("/me",
    checkAuth,
    userController.getMeValidator(),
    userController.getMe
);

userRouter.post("/sign-up",
    userController.registerValidator(),
    userController.register
);

userRouter.put("");

export default userRouter;