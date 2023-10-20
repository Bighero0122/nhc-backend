import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthRequest } from 'types';

import { errorHandlerWrapper } from 'utils';

export const getMeValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getMeHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  // If user is already registered in users table, please raise an error
  res.status(httpStatus.OK).json({ user: req.user });
};

export const getMe = errorHandlerWrapper(getMeHandler);
