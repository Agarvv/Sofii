import { Request, Response } from 'express';
import * as loginService from '../../services/auth/LoginService';
import bcrypt from 'bcryptjs';

class AuthController {
  public static async RegisterUser(req: Request, res: Response): Promise<void> {
    res.status(500).json("Not Implemented");
  }
}

export default AuthController;