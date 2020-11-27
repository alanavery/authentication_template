// Import modules
let router = require('express').Router();
let isLoggedIn = require('../middleware/is-logged-in');

// Route: GET /trips
router.get('/', isLoggedIn, (req, res) => {
  console.log(req.session);
  res.render('trips/trips');
});

// Export module
module.exports = router;