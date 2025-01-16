import { Request, Response } from 'express';
import passport from 'passport';

class GoogleController {
  public static authenticate(req: Request, res: Response) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })(req, res); 
  }

  public static callback(req: Request, res: Response) {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
      if (err) {
        console.log(err); 
        return res.redirect('/'); 
      }

      const email = user?.email; 

      return res.json({ email });
    })(req, res); 
  }
}

export default GoogleController;


