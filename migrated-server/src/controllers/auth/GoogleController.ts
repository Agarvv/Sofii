import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

class GoogleController {
  public static authenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })(req, res, next); 
  }

  public static callback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
      if (err) {
        console.log(err); 
        return res.redirect('/'); 
      }

      const email = user?.email; 

      return res.json({ email });
    })(req, res, next); 
  }
}

export default GoogleController;
