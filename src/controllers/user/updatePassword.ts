import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';

import { REASON_CODES } from 'consts';

import { ArgumentValidationError, CustomError } from 'errors';

import { userService } from 'services';

import { AuthRequest } from 'types';

import { Logger, comparePassword, encryptPassword } from 'utils';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';

export const updateValidator = () => {
  return [
    body('oldPassword').notEmpty().withMessage('Old Password is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required'),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
type ReqQuery = unknown;

export const updatePasswordHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { oldPassword, password, confirmPassword } = req.body;

  const user = await userService.getUser(req.user.email);
  Logger.log(user);
  if (!user) {
    throw new CustomError(
      `${req.user.email} does not exist.`,
      httpStatus.BAD_REQUEST,
      REASON_CODES.AUTH.USER_IS_NOT_EXIST
    );
  }

  if (password !== confirmPassword) {
    throw new CustomError(
      'Password must be matched',
      httpStatus.BAD_REQUEST,
      REASON_CODES.AUTH.PASSWORD_INCORRECT
    );
  }

  const dbPassword = await userService.getPassword(req.user.email);
  const compare = await comparePassword(oldPassword, dbPassword.password);

  if (!compare) {
    throw new CustomError(
      'Old Password is incorrect',
      httpStatus.BAD_REQUEST,
      REASON_CODES.AUTH.PASSWORD_INCORRECT
    );
  }

  const cryptPassword = await encryptPassword(password);

  const result = await userService.updateUser(req.user.email, cryptPassword);
  res.status(httpStatus.OK).json(result);
};

export const updatePassword = errorHandlerWrapper(updatePasswordHandler);
