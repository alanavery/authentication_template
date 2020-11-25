// Import modules
let express = require('express');
let layouts = require('express-ejs-layouts');
let session = require('express-session');
require('dotenv').config();

// Import API modules
let axios = require('axios');

// Environment variables
let SESSION_SECRET = process.env.SESSION_SECRET;

// Initialize app
let app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(layouts);
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Controllers
app.use('/trips', require('./controllers/trips'));








// Home route (GET /)
app.get('/', (req, res) => {
  res.render('index');
});







// Instruct app to listen for requests
let PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
  console.log(`The server is up and running on PORT ${PORT}.`);
});

// module.exports = server;