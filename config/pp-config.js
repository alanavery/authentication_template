// // Import modules
// let passport = require('passport');
// let LocalStrategy = require('passport-local').Strategy;
// let db = require('../models');

// // Serialize user object and convert to id
// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });

// // Deserialize user object by referencing id in database
// passport.deserializeUser(async (id, cb) => {
//   try {
//     let user = await db.user.findByPk(id);
//     cb(null, user);
//   } catch (cb) { }
// });

// // Set up Passport's local strategy for authentication
// passport.use(new LocalStrategy({
//   emailField: 'email',
//   passwordField: 'password'
// }, async (email, password, cb) => {
//   try {
//     let user = await db.user.findOne({ where: { email } });
//     console.log(user);
//     if (!user || !user.validPassword(password)) {
//       cb(null, false);
//     } else {
//       cb(null, user);
//     }
//   } catch (cb) { }
// }));

// // Export module
// module.exports = passport;


let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db = require('../models');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.user.findByPk(id).then(user => {
    if (user) {
      cb(null, user);
    }
  }).catch(error => {
    console.log(error);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  db.user.findOne({
    where: { email }
  }).then(user => {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;