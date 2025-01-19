import { Request, Response } from 'express';
import AuthService from '@services/auth/AuthService';

class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    await AuthService.registerUser(username, email, password);

    res.status(201).json({ message: "¡Welcome To Sofii!" });
  }

  public static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const jwtToken = await AuthService.loginUser(email, password);

    res.cookie('jwt', jwtToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3600000 });
    res.status(200).json({ accessToken: jwtToken });
  }
  
  public static async sendResetPassword(req: Request, res: Response) {
      const { email } = req.body; 
      
      await AuthService.sendResetPassword(email);
      
      res.status(200).json({
          "message": "¡Check Your Email!"
      })
  }
  
  public static async resetPassword(req: Request, res: Response) {
      const { email, password, resetToken } = req.body; 
      
      await AuthService.resetPassword(email, password, resetToken); 
      
      res.status(200).json({
          "message": "¡Your Password Is Set!"
      })
      
  }
  
  public static async checkAuthentication(req: Request, res: Response) {
      const jwt = req.cookies.jwt 
      
      const userId = await AuthService.checkAuthentication(jwt); 
      
      res.status(200).json({
          userId: userId 
      })
  }
}

export default AuthController;