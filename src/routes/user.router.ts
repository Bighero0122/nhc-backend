import express from 'express';

import { userController } from 'controllers';

import { checkAuth } from 'utils';

const userRouter = express.Router();

userRouter.get(
  '/getMe',
  checkAuth,
  userController.getMeValidator(),
  userController.getMe
);

userRouter.post(
  '/signup',
  userController.registerValidator(),
  userController.register
);

userRouter.put(
  '/updatePassword',
  checkAuth,
  userController.updateValidator(),
  userController.updatePassword
);

export default userRouter;
