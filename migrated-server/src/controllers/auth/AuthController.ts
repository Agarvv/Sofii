import { Request, Response } from 'express';
import AuthService from '../../services/auth/AuthService';

class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    await AuthService.registerUser(username, email, password);

    res.status(201).json({ message: "¡Welcome To Sofii!" });
  }

  public static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const jwtToken = await AuthService.loginUser(email, password);

    res.status(200).json({ accessToken: jwtToken });
  }
}

export default AuthController;