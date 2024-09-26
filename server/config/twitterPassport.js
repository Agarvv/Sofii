const TwitterStrategy = require('passport-twitter').Strategy;
const passport = require('passport')

passport.use(new TwitterStrategy({
    consumerKey: 'here', 
    consumerSecret: 'here',  
    callbackURL: '/auth/twitter/callback',
    includeEmail: true  
  },
  (token, tokenSecret, profile, done) => {
    const user = {
      id: profile.id,
      username: profile.username,
      email: profile.emails ? profile.emails[0].value : null,  
      profilePicture: profile.photos[0].value
    };

    return done(null, user);
  }
));