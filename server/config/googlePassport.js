const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    done(null, user);
  });
  // 
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://sofii.onrender.com/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
      
      const user = {
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value
      }
      
      return done(null, user)
    
  }));

