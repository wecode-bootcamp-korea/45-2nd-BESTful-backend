const commentDao = require('../models/commentDao');

const getCommentByFeedId = async (feedId) => {
  return await commentDao.getCommentByFeedId(feedId);
};

const addComment = async (userId, feedId, contents) => {
  return await commentDao.addComment(userId, feedId, contents);
};

module.exports = {
  getCommentByFeedId,
  addComment,
};
