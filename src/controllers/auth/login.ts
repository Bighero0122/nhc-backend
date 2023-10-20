import {Request, Response} from 'express';
import {body} from 'express-validator';
import httpStatus from 'http-status';
import { REASON_CODES } from 'consts';
import { userService } from 'services';
import { CustomError } from 'errors';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { Logger, comparePassword } from 'utils';
import { jwtSign } from 'utils/jwt';

export const loginValidator = () => {
    return[
        body('email')
            .optional()
            .isEmail()
            .withMessage('Email is not correct'),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
    email?: string;
    password?: string;
}
type ReqQuery = unknown;

export const loginHandler =async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const {email, password} = req.body;

    const user = await userService.getUser(email);
    Logger.log(user);
    if (!user) {
        throw new CustomError(
          "User does not exist!",
          httpStatus.BAD_REQUEST,
          REASON_CODES.AUTH.USER_IS_NOT_EXIST
        );
    }

    const pwd = await userService.getPassword(email);

    const compare = await comparePassword(password, pwd.password);
    if (!compare) {
        throw new CustomError(
          'Password is incorrect!',
          httpStatus.BAD_REQUEST,
          REASON_CODES.AUTH.PASSWORD_INCORRECT
        );
      }
    const token = jwtSign(user);
    res.status(httpStatus.OK).json({user:user, token:token});
}

export const login = errorHandlerWrapper(loginHandler);