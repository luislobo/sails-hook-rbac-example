/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */
const MILLISECONDS_PER_SECOND = 1000;
const SECOND = MILLISECONDS_PER_SECOND;
const SESSION_TTL = 5;

module.exports.session = {

  /***************************************************************************
   *                                                                          *
   * Session secret is automatically generated when your new app is created   *
   * Replace at your own risk in production-- you will invalidate the cookies *
   * of your users, forcing them to log in again.                             *
   *                                                                          *
   ***************************************************************************/
  secret: '931b025a4ea87b89dde541af0c0fe697',

  adapter: 'connect-redis',
  host: 'localhost',
  port: 36379,
  db: 1,
  prefix: 'sess:',
  ttl: SESSION_TTL,

  cookie: {
    httpOnly: true,
    maxAge: SESSION_TTL * SECOND,
    secure: true,
  },

  /***************************************************************************
   *                                                                          *
   * Customize when built-in session support will be skipped.                 *
   *                                                                          *
   * (Useful for performance tuning; particularly to avoid wasting cycles on  *
   * session management when responding to simple requests for static assets, *
   * like images or stylesheets.)                                             *
   *                                                                          *
   * https://sailsjs.com/config/session                                       *
   *                                                                          *
   ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
