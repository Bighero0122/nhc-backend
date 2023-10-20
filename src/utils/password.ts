import bcrypt from 'bcryptjs';

export const comparePassword = async(userPassword:string, confirmPassword: string):Promise<boolean> => {
    return await bcrypt.compare(userPassword, confirmPassword);
};

export const encryptPassword = async(password:string):Promise<string> => {
    const hashPassword = await bcrypt.hash(password, 8);
    return hashPassword;
}