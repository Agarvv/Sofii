import { User } from '@models/users/User';  
import findByEmail from '@outils/findByEmail'; 
import * as loginService from '@services/auth/loginService';
import { PasswordResetToken } from '@models/users/PasswordResetToken';
import { Op } from 'sequelize';
import * as tokenController from './TokenController';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface IUser {
    email: string;
    password?: string;
}

const handleLogin = async (email: string, password: string): Promise<string> => {
    
    const user = await findByEmail(email);
    
    const jwtToken = await loginService.makeLogin(user, password);
    
    return jwtToken;
};

// when /callback endpoint is reached during social media auth, this function is called.
const loginBySocialMedia = async (socialMediaUser: IUser): Promise<string> => {
    const user = await findByEmail(socialMediaUser.email);
    
    let jwtToken: string;

    if (user) {
        jwtToken = await loginService.makeLogin(user, socialMediaUser.password || '');
    } else {
        jwtToken = await createNewUserBySocialMedia(socialMediaUser);
    }

    return jwtToken;
};


export default {
    handleLogin,
    loginBySocialMedia
};