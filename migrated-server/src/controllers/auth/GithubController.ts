import { Request, Response } from 'express';
import passport from 'passport';

class GithubController {

  public static authenticate(req: Request, res: Response) {
    passport.authenticate('github', {
      scope: ['user:email'], 
    })(req, res);
  }

  public static callback(req: Request, res: Response) {
    passport.authenticate('github', { failureRedirect: '/' }, (err: any, user: any) => {
      if (err) {
        return res.redirect('/'); 
      }

      const email = user?.email; 

      return res.json({ email });
    })(req, res); 
  }
}

export default GithubController;


