module.exports = async (req, res) => {
  const newPost = req.allParams();

  if (req.me) {
    newPost.author = req.me.id;
    const post = await Post.create(newPost);

    if (req.wantsJSON) {
      return res.ok({res: 'Post created!'});
    }

  }
  // Attempt to signup a user using the provided parameters
  res.redirect('/');

};
