module.exports = async function login(req, res, next) {

  try {
    // Attempt to signup a user using the provided parameters
    const user = await User.signup({
      fullName: req.param('fullName'),
      emailAddress: req.param('email'),
      password: req.param('password'),
    });

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
    
  } catch (err) {
    return res.serverError(err);
  }

}
;
