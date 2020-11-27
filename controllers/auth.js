// Import modules
let router = require('express').Router();
let db = require('../models');
let passport = require('../config/pp-config');

// Route: GET /auth/signup
router.get('/signup', (req, res) => {
  console.log(req.session);
  res.render('auth/signup');
});

// Route: GET /auth/login
router.get('/login', (req, res) => {
  console.log(req.session);
  res.render('auth/login');
});

// Route: GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

// Route: POST /auth/signup
// router.post('/signup', async (req, res) => {
//   try {
//     let user = await db.user.findOrCreate({
//       where: { email: req.body.email },
//       defaults: {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password
//       }
//     });
//     if (user[1]) {
//       passport.authenticate('local', {
//         successRedirect: '/',
//         successFlash: 'Account created.'
//       })(req, res);
//     } else {
//       req.flash('error', 'Email already exists');
//       res.redirect('/auth/signup');
//     }
//   } catch (error) {
//     req.flash('error', error.message);
//     res.redirect('/auth/signup');
//   }
// });

router.post('/signup', (req, res) => {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }
  }).then(([user, created]) => {
    if (created) {
      console.log(user, created);
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created.'
      })(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(error => {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

// Route: POST /auth/login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'You are logged in.',
  failureFlash: 'Invalid email and/or password.'
}));

// Export module
module.exports = router;