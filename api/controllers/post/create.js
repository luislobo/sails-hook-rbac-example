module.exports = async (req, res) => {
  const newPost = req.allParams();
  console.log(newPost);
  const post = await Post.create(req.body);

  if (req.wantsJSON) {
    return res.ok({res: 'Post created!'});
  }

  // Attempt to signup a user using the provided parameters
  res.redirect('/');

};
