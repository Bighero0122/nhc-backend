import { UserEntity } from "entities";
import {Logger, getUserRepository} from 'utils';

export const getUser = async(email:string):Promise<UserEntity|null> => {
    const userRepository = await getUserRepository();
    const user: UserEntity | null = await userRepository.createQueryBuilder('user')
    .select([
        'user.email',
        'user.name'
    ])
    .where('user.email = :email', {email})
    .getOne();
    Logger.log("User", user);
    return user;
}

export const getPassword = async(email:string):Promise<UserEntity|null> => {
    const userRepository = await getUserRepository();
    const user: UserEntity | null = await userRepository
    .createQueryBuilder('user')
    .select([
        'user.password'
    ])
    .where('user.email = :email', {email})
    .getOne();
    return user;
}

export const createUser = async(email:string, name: string, password: string):Promise<UserEntity|null> => {
    const userRepository = await getUserRepository();
    const user = new UserEntity();
    user.email = email;
    user.name = name;
    user.password = password;
    await userRepository.save(user);
    return user;
}