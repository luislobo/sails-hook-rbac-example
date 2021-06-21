/**
 * Development environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for development.  The configuration in this file
 * is only used in your development environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=development node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {

  /**************************************************************************
  *                                                                         *
  * Set the debug log level.                                                *
  *                                                                         *
  * (https://sailsjs.com/config/log)                                        *
  *                                                                         *
  ***************************************************************************/
  log: {
    level: 'verbose'
  },


  /**************************************************************************
  *                                                                         *
  * Lift the server on port 30080 to avoid port clashing                    *
  *                                                                         *
  ***************************************************************************/
  port: process.env.PORT || 30080,

};
