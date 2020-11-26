// Import modules
let router = require('express').Router();

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

// Export module
module.exports = router;