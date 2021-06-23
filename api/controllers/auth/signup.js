module.exports = function logout(req, res, next) {

  // Attempt to signup a user using the provided parameters
  User.signup({
    fullName: req.param('fullName'),
    emailAddress: req.param('email'),
    password: req.param('password'),
  }, function(err, user) {
    // res.negotiate() will determine if this is a validation error
    // or some kind of unexpected server error, then call `res.badRequest()`
    // or `res.serverError()` accordingly.
    if (err) {
      return res.negotiate(err);
    }

    // Go ahead and log this user in as well.
    // We do this by "remembering" the user in the session.
    // Subsequent requests from this user agent will have `req.session.me` set.
    req.session.userId = user.id;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the signup was successful.
    if (req.wantsJSON) {
      return res.ok('Signup successful!');
    }

    // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
    return res.redirect('/');
  });
};