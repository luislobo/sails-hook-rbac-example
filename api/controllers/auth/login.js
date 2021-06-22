module.exports = function login(req, res, next) {

  // See `api/responses/login.js`
  return res.login({
    emailAddress: req.param('emailAddress'),
    password: req.param('password'),
    successRedirect: '/',
    invalidRedirect: '/login'
  });
};
