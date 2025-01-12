import User from '../../models/users/User';  
import findByEmail from '../../outils/findByEmail'; 
import * as loginService from '../../services/auth/LoginService';

import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
 
/*const handleLogin = async (email: string, password: string): Promise<string> => {
    
    const user = await findByEmail(email);
    
    const jwtToken = await loginService.makeLogin(user, password);
    
    return jwtToken;
};*/


/*const loginBySocialMedia = async (socialMediaUser: IUser): Promise<string> => {
    const user = await findByEmail(socialMediaUser.email);
    
   // let jwtToken: string;

   // if (user) {
    //    jwtToken = await loginService.makeLogin(user, socialMediaUser.password || '');
   // } else {
   //     jwtToken = await createNewUserBySocialMedia(socialMediaUser);
  //  }

  //  return jwtToken;
};*/


export default {
    //handleLogin
   // loginBySocialMedia
};