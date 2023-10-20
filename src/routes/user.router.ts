import express from 'express';
import { userController } from 'controllers';

import { checkAuth } from 'utils';

const userRouter = express.Router();

userRouter.get("/",
    checkAuth,
    userController.getMeValidator(),
    userController.getMe
);

userRouter.post("/",
    userController.registerValidator(),
    userController.register
);

userRouter.put("/",
    checkAuth,
    userController.updateValidator(),
    userController.updatePassword
);

export default userRouter;