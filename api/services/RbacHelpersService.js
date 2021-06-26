module.exports = {
  isAuthor: async function(params, next) {
    const postId = params.postId;
    const sessionUserId = params.me.id;
    const post = await Post.findOne(postId);
    if(post.author === sessionUserId) {
      return next(null, true);
    }
    return next(null, false);
  },
};
