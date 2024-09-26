const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport')

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret:  process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email']  
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      id: profile.id,
      username: profile.username,
      email: profile.emails ? profile.emails[0].value : null, 
      profilePicture: profile.photos[0].value
    };

    return done(null, user);
  }
));