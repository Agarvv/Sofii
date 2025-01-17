import { Request, Response, NextFunction} from 'express';
import passport from 'passport';

class GithubController {

  public static authenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('github', {
      scope: ['user:email'], 
    })(req, res, next);
  }

  public static callback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('github', { failureRedirect: '/' }, (err: any, user: any) => {
      if (err) {
        return res.redirect('/'); 
      }

      const email = user?.email; 

      return res.json({ email });
    })(req, res, next); 
  }
}

export default GithubController;


