const commentDao = require('../models/commentDao');

const getCommentByFeedId = async (feedId) => {
  return await commentDao.getCommentByFeedId(feedId);
};

module.exports = {
  getCommentByFeedId,
};
