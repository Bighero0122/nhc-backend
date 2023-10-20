import jwt from 'jsonwebtoken';

import { JWT_EXPIRATION_TIME, JWT_TOKEN } from 'config';

import { UserEntity } from 'entities';

export const jwtSign = (user: UserEntity): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_TOKEN,
    {
      expiresIn: JWT_EXPIRATION_TIME,
    }
  );
};
