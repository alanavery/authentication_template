// Import modules
let router = require('express').Router();
let db = require('../models');
let passport = require('../config/pp-config');

// Route: GET /auth/signup
router.get('/signup', (req, res) => {
  console.log(req.session);
  res.render('auth/signup');
});

// Route: POST /auth/signup
router.post('/signup', async (req, res) => {
  try {
    let user = await db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }
    });
    if (user[1]) {
      // console.log(`An account for ${user[0].firstName} was created.`);
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created.',
        failureRedirect: '/auth/signup'
      })(req, res);
    } else {
      // console.log('Invalid name, email and/or password.');
      req.flash('error', 'Invalid name, email and/or password.');
      res.redirect('/auth/signup');
    }
  } catch (error) {
    // console.log(`An error occurred: ${error.message}`);
    req.flash('error', `An error occurred: ${error.message}`);
    res.redirect('/auth/signup');
  }
});

// Route: GET /auth/login
router.get('/login', (req, res) => {
  console.log(req.session);
  res.render('auth/login');
});

// Route: POST /auth/login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are logged in.',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid email and/or password.'
}));

// Route: GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/');
});

// Export module
module.exports = router;