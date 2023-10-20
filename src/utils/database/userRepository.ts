import { DBConnect } from '../dbConnector';

import { UserEntity } from 'entities';

export const getUserRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(UserEntity);
};
