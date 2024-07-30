const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '511731360531-eln69b4400hvrf4a0r6l8lr05jrsce52.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('Google profile: ', profile);
    return done(null, profile);
  }
));