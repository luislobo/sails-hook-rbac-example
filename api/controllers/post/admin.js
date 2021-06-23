const sanitize = require('sanitize-html');
module.exports = async (req, res) => {

  const posts = await Post.find().populate('author');

  console.log(posts);


  // Attempt to signup a user using the provided parameters
  res.view('pages/post/admin', {
    posts,
    me: req.me,
    s: sanitize,
  });

};
