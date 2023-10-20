import {Request, Response} from 'express';
import {body} from 'express-validator';
import httpStatus from 'http-status';
import { REASON_CODES } from 'consts';
import { userService } from 'services';
import { ArgumentValidationError, CustomError } from 'errors';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { Logger, encryptPassword } from 'utils';

export const registerValidator = () => {
    return[
        body('email')
            .notEmpty()
            .withMessage('Email is not correct'),
        body('name')
            .notEmpty()
            .withMessage('Name is required'),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
    email?: string;
    name?: string;
    password: string;
}
type ReqQuery = unknown;

export const registerHandler =async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const {email, name, password} = req.body;
    if(!email){
        throw new ArgumentValidationError('Invalid Arguments', [
            'Email is required',
        ])
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
    const cryptPassword = await encryptPassword(password);
    const result = await userService.createUser(email, name, cryptPassword);
    res.status(httpStatus.OK).json(result);
}

export const register = errorHandlerWrapper(registerHandler);