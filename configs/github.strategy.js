const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
//online
  //clientID: 'f1b06162bc22843dddac',
  //clientSecret: 'f16343db7b155c255a8283b307fe39f25283813e',
  //callbackURL: "https://merit-front.herokuapp.com/auth/github/callback"

//offline
  clientID: 'Iv1.51fb7de2f224f187',
  clientSecret: 'afc8c17d493cf774d04970b4656a5e7a93d9d040',
  callbackURL: "http://localhost:3000/auth/github/callback"

  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});