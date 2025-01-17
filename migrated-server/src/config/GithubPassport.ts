import passport from 'passport';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';

passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: 'https://sofii-vsly.onrender.com/api/sofii/auth/github/callback',
      scope: ['user:email'],
    },
    (accessToken: string, refreshToken: string, profile: GitHubProfile, done: (err: any, user?: any) => void) => {
      const user = {
        id: profile.id,
        username: profile.username,
        email: profile.emails ? profile.emails[0].value : null,
        profilePicture: profile.photos ? profile.photos[0].value : '',
      };
      return done(null, user);
    }
  ));
  