module.exports = function logout(req, res, next) {

  // "Forget" the user from the session.
  // Subsequent requests from this user agent will NOT have `req.session.me`.
  req.session.me = null;

  // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
  // send a simple response letting the user agent know they were logged out
  // successfully.
  if (req.wantsJSON) {
    return res.ok('Logged out successfully!');
  }

  // Otherwise if this is an HTML-wanting browser, do a redirect.
  return res.redirect('/');
};
