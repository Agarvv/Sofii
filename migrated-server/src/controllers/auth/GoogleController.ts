import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import AuthService from '@services/auth/AuthService'

class GoogleController {
  public static authenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })(req, res, next); 
  }

  public static callback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', { failureRedirect: '/' }, async (err, user) => {
    if (err) {
      console.log(err); 
      return res.redirect('https://sofii.vercel.app'); 
    }

    if (user) {
      try {
        const jwt = await AuthService.authenticateWithSocialMedia(user);

        res.cookie('jwt', jwt, {
          secure: true,
          httpOnly: true,
          sameSite: 'none'
        });

        return res.status(200).json({
          accessToken: jwt
        });
      } catch (error) {
        console.log('Google auth error:', error);
        return res.redirect('https://sofii.vercel.app');
      }
    }
  })(req, res, next);
 }
  
  
  
}

export default GoogleController;
