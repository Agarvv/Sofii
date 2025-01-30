import { Request, Response, NextFunction} from 'express';
import passport from 'passport';
import AuthService from '@services/auth/AuthService'


class GithubController {

  public static authenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('github', {
      scope: ['user:email'], 
    })(req, res, next);
  }

  public static callback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('github', { failureRedirect: '/' }, async (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.redirect('https://sofii.vercel.app'); 
    }

    if (user) {
      try {
        const { jwt, userId } = await AuthService.authenticateWithSocialMedia(user);

        res.cookie('jwt', jwt, {
          secure: true,
          httpOnly: true,
          sameSite: 'none'
        });

        res.redirect(`https://sofii-vsly.vercel.app?userId=${userId}`)
        
      } catch (error) {
        console.log('Github auth error:', error);
        return res.redirect('https://sofii.vercel.app'); 
      }
    }
  })(req, res, next);
}

}

export default GithubController;


