module.exports = async (req, res) => {
  const postId = req.param('postId');
  if (postId) {
    await Post.destroy(postId);
  }
  res.redirect('/post/admin');
};
