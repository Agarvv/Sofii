const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: 'api_key_here', 
    consumerSecret: 'secret_here',  
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