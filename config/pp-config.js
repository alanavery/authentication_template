// Import modules
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db = require('../models');

// Serialize user ID to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user ID and find user
passport.deserializeUser(async (id, done) => {
  try {
    let user = await db.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Set up Passport's local strategy for authentication
// passport.use(new LocalStrategy({
//   emailField: 'email',
//   passwordField: 'password'
// }, async (email, password, cb) => {
//   try {
//     let user = await db.user.findOne({ where: { email } });
//     if (!user || !user.validPassword(password)) {
//       cb(null, false);
//     } else {
//       cb(null, user);
//     }
//   } catch (cb) { }
// }));

// passport.use(new LocalStrategy(
//   async (username, password, done) => {
//     try {
//       let user = await db.user.findOne({ where: { email: username } });
//       if (!user) {
//         console.log('Incorrect username.');
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         console.log('Incorrect password.');
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.user.findOne({
      where: { email: username }
    }).then(user => {
      if (!user) {
        console.log('Incorrect username.');
        done(null, false);
      }
      if (!user.validPassword(password)) {
        console.log('Inccorect password.');
        done(null, false);
      }
      done(null, user);
    }).catch(done);
  }
));

// Export module
module.exports = passport;