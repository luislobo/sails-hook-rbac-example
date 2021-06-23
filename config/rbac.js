module.exports.rbac = {
  rbacRules: [
    {a: 'anonymous'},
    {a: 'normal', can: 'anonymous'},
    {a: 'admin', can: 'normal'},
  ],
  helper: {
    path: 'services.RbacHelpers',
  },
  sessionObject: 'me',
  sessionObjectRolePath: 'role',
};
