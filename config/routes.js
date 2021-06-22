/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': {
    view: 'pages/homepage',
    rbac: {anonymous: {}},
  },

  '/login': {
    view: 'pages/login',
    rbac: {anonymous: {}},
  },

  'post /login': {
    controller: 'auth',
    action: 'login',
    rbac: {anonymous: {}},
  },

  '/signup': {
    view: 'pages/signup',
    rbac: {anonymous: {}},
  },

  'post /signup': {
    controller: 'auth',
    action: 'signup',
    rbac: {anonymous: {}},
  },

  '/forgot-password': {
    view: 'pages/forgot-password',
    rbac: {anonymous: {}},
  },

  'post /forgot-password': {
    controller: 'auth',
    action: 'forgotPassword',
    rbac: {anonymous: {}},
  },

  'get /post': {
    controller: 'post',
    action: 'find',
    rbac: {anonymous: {}},
  },

  'get /post/:postId': {
    controller: 'post',
    action: 'findOne',
    rbac: {anonymous: {}},
  },

  'post /post': {
    controller: 'post',
    action: 'create',
    rbac: {normal: {}},
  },

  'put /post/:postId': {
    controller: 'post',
    action: 'update',
    rbac: {
      normal: {
        when: 'isAuthor',
      },
      admin: {},
    },
  },

  'delete /post/:postId': {
    controller: 'post',
    action: 'delete',
    rbac: {
      normal: {
        when: function(params, next){
          return sails.services.RbacHelpers.isAuthor(params, next);
        },
      },
      admin: {},
    },
  },

  'delete /user/:userId': {
    controller: 'user',
    action: 'delete',
    rbac: {
      admin: {},
    },
  },

};
