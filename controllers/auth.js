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
  res.redirect('/');
});

// Route: POST /auth/signup
router.post('/signup', async (req, res) => {
  try {
    let user = await db.user.findOrCreate({
      where: { email: req.body.username },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }
    });
    if (user[1]) {
      console.log(`An account for ${user[0].firstName} was created.`);
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/signup'
      })(req, res);
    } else {
      console.log('Email already exists.');
      res.redirect('/auth/signup');
    }
  } catch (error) {
    console.log(`An error occurred: ${error.message}`);
    res.redirect('/auth/signup');
  }
});

// Route: POST /auth/login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

// Export module
module.exports = router;