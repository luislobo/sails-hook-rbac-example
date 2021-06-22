/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com',
    },

    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad',
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst',
    },

    role: {
      type: 'string',
      defaultsTo: 'normal',
      description: 'A role to be used with the RBAC hook. Helps determine which routes are valid',
      isIn: [
        'anonymous',
        'normal',
        'admin',
      ],
    },

    lastSeenAt: {
      type: 'ref',
      columnType: 'datetime',
      description: 'A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).',
      example: '2021-06-21T04:20:31.538Z',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a

  },

  beforeCreate: (recordToCreate, proceed) => {
    recordToCreate.lastSeenAt = new Date();
    proceed();
  },

  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function(inputs, cb) {
    // Create a user
    User.create({
      fullName: inputs.fullName,
      emailAddress: inputs.emailAddress,
      // TODO: But encrypt the password first
      password: inputs.password,
    }).exec(cb);
  },

  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • emailAddress    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function(inputs, cb) {
    // Create a user
    User.findOne({
      emailAddress: inputs.emailAddress,
      // TODO: But encrypt the password first
      password: inputs.password,
    }).exec(cb);
  },
};
