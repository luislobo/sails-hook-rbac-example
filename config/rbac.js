module.exports.rbac = {
  rbacRules: [
    {a: 'anonymous'},
    {a: 'normal', can: 'anonymous'},
    {a: 'admin', can: 'normal'},
  ],
  helper: {
    path: 'services.RbacHelpersService',
  },
  waitFor: [
    'passport',
    'session',
    'orm',
  ],
  sessionObject: 'me',
  sessionObjectRolePath: 'role',
};
