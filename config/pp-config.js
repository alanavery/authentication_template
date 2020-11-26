// Import modules
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db = require('../models');

// Serialize user object and convert to id
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Deserialize user object by referencing id in database
passport.deserializeUser(async (id, cb) => {
  try {
    let user = await db.user.findByPk(id);
    cb(null, user);
  } catch (cb) { }
});

// Set up Passport's local strategy for authentication
passport.use(new LocalStrategy({
  emailField: 'email',
  passwordField: 'password'
}, async (email, password, cb) => {
  try {
    let user = await db.user.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  } catch (cb) { }
}));

// Export module
module.exports = passport;