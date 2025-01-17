import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
  done(null, user.id);  
});

passport.deserializeUser((id: string, done: (err: any, user?: any | null) => void) => {
  done(null, { id, username: '', email: '', profilePicture: '' }); 
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: 'https://sofii-vsly.onrender.com/api/sofii/auth/google/callback',
  },
  (accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user?: any) => void) => {
    const user = {
      id: profile.id,
      username: profile.displayName,
      email: profile.emails ? profile.emails[0].value : '',
      profilePicture: profile.photos ? profile.photos[0].value : '',
    };

    return done(null, user); 
  }
));
