const TwitterStrategy = require('passport-twitter').Strategy;
const passport = require('passport')

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: 'https://sofii.onrender.com/auth/twitter/callback',
  includeEmail: true
},
(token, tokenSecret, profile, done) => {
  const user = {
    id: profile.id,
    username: profile.username,
    email: profile.emails ? profile.emails[0].value : null,
    profilePicture: profile.photos[0].value
  };
  
  // req.session.oauthRequestToken = token; <-- only if necesary
  // req.session.oauthRequestTokenSecret = tokenSecret; <-- same as above
  
  done(null, user); // Passport necesita que llames a 'done' aquí cuando termines.
}
));
