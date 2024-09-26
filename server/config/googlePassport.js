const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });


passport.use(new GoogleStrategy({
    clientID: 'here',
    clientSecret: 'here',
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
      
      const user = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value
      }
      
      return done(null, user)
    
  }));

