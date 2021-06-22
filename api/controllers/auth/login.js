const {isEmail} = require('validator');

module.exports = function login(req, res, next) {

  const {email, password} = req.allParams();

  if (!email || !isEmail(email)) {
    res.redirect('/login');
  }

  // See `api/responses/login.js`
  return res.login({
    emailAddress: req.param('emailAddress'),
    password: req.param('password'),
    successRedirect: '/',
    invalidRedirect: '/login',
  });
};
