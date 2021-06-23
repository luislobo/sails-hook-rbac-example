module.exports = async (req, res) => {
  const postId = req.param('postId');
  if (postId) {
    await Post.destroy(postId);
  }
  // Attempt to signup a user using the provided parameters
  res.redirect('/post/admin');

};
