module.exports = function() {
  return {
    routes: {
      before: {
        '/*': async function session(req, res, next) {

          // No session? Proceed as usual.
          // (e.g. request for a static asset)
          if (!req.session) { return next(); }

          // Not logged in? Proceed as usual.
          if (!req.session.userId) { return next(); }

          // Otherwise, look up the logged-in user.
          var loggedInUser = await User.findOne({
            id: req.session.userId,
          });

          // If the logged-in user has gone missing, log a warning,
          // wipe the user id from the requesting user agent's session,
          // and then send the "unauthorized" response.
          if (!loggedInUser) {
            sails.log.warn(
              'Somehow, the user record for the logged-in user (`' +
              req.session.userId + '`) has gone missing....');
            delete req.session.userId;
            return res.unauthorized();
          }

          // Expose the user record as an extra property on the request object (`req.me`).
          // > Note that we make sure `req.me` doesn't already exist first.
          if (req.me !== undefined) {
            throw new Error(
              'Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
          }
          req.me = loggedInUser;

          // If our "lastSeenAt" attribute for this user is at least a few seconds old, then set it
          // to the current timestamp.
          //
          // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)
          var MS_TO_BUFFER = 60 * 1000;
          var now = Date.now();
          if (loggedInUser.lastSeenAt < now - MS_TO_BUFFER) {
            User.updateOne({id: loggedInUser.id}).
              set({lastSeenAt: now}).
              exec((err) => {
                if (err) {
                  sails.log.error(
                    'Background task failed: Could not update user (`' +
                    loggedInUser.id +
                    '`) with a new `lastSeenAt` timestamp.  Error details: ' +
                    err.stack);
                  return;
                }//•
                sails.log.verbose(
                  'Updated the `lastSeenAt` timestamp for user `' +
                  loggedInUser.id + '`.');
                // Nothing else to do here.
              });//_∏_  (Meanwhile...)
          }//ﬁ

          // If this is a GET request, then also expose an extra view local (`<%= me %>`).
          // > Note that we make sure a local named `me` doesn't already exist first.
          // > Also note that we strip off any properties that correspond with protected attributes.
          if (req.method === 'GET') {
            if (res.locals.me !== undefined) {
              throw new Error(
                'Cannot attach logged-in user as the view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
            }

            // Exclude any fields corresponding with attributes that have `protect: true`.
            var sanitizedUser = _.extend({}, loggedInUser);

            // If there is still a "password" in sanitized user data, then delete it just to be safe.
            // (But also log a warning so this isn't hopelessly confusing.)
            if (sanitizedUser.password) {
              sails.log.warn(
                'The logged in user record has a `password` property, but it was still there after pruning off all properties that match `protect: true` attributes in the User model.  So, just to be safe, removing the `password` property anyway...');
              delete sanitizedUser.password;
            }//ﬁ

            res.locals.me = sanitizedUser;

          }//ﬁ

          // Prevent the browser from caching logged-in users' pages.
          // (including w/ the Chrome back button)
          // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
          // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
          res.setHeader('Cache-Control', 'no-cache, no-store');
          return next();
        },
      },
    },
  };
};
