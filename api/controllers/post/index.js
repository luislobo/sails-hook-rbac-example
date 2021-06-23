const sanitize = require('sanitize-html');
module.exports = async (req, res) => {

  const posts = await Post.find().populate('author');

  // Attempt to signup a user using the provided parameters
  res.view('pages/post-index', {
    posts,
    me: req.me,
    s: sanitize,
  });

};
