module.exports = async (req, res) => {

  const posts = await Post.find();

  console.log(posts);

  console.log(req.me);

  console.log(req.session.me);

  // Attempt to signup a user using the provided parameters
  res.view('pages/post-index', {
    posts,
    me: req.me,
  });

};
