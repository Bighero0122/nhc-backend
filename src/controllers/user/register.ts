import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';

import { REASON_CODES } from 'consts';

import { ArgumentValidationError, CustomError } from 'errors';

import { userService } from 'services';

import { Logger, encryptPassword } from 'utils';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';

export const registerValidator = () => {
  return [
    body('email').notEmpty().withMessage('Email is not correct'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required'),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email?: string;
  name?: string;
  password: string;
  confirmPassword: string;
};
type ReqQuery = unknown;

export const registerHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, name, password, confirmPassword } = req.body;
  if (!email) {
    throw new ArgumentValidationError('Invalid Arguments', [
      'Email is required',
    ]);
  }

  const user = await userService.getUser(email);
  Logger.log(user);
  if (user) {
    throw new CustomError(
      `${email} is already registered. Please sign in or change another email address`,
      httpStatus.BAD_REQUEST,
      REASON_CODES.AUTH.USER_IS_ALREADY_REGISTERED
    );
  }

  if (password !== confirmPassword) {
    throw new CustomError(
      'Password must be matched',
      httpStatus.BAD_REQUEST,
      REASON_CODES.AUTH.PASSWORD_INCORRECT
    );
  }

  const cryptPassword = await encryptPassword(password);
  const result = await userService.createUser(email, name, cryptPassword);
  res.status(httpStatus.OK).json(result);
};

export const register = errorHandlerWrapper(registerHandler);
