module.exports = async (req, res) => {
  const postId = req.param('postId');
  if (postId) {
    await Post.destroy(postId);
  }
  if (req.me && req.me.role === 'normal') {
    return res.redirect('/');
  }
  return res.redirect('/post/admin');
};
