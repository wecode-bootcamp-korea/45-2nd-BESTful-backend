const feedDao = require('../models/feedDao');

const getAllFeed = async (userId, feedId, targetUserId, selectedUserId, offset, limit, genderId, seasonId, styleId, orderBy) => {
  return await feedDao.getAllFeed(userId, feedId, targetUserId, selectedUserId, offset, limit, genderId, seasonId, styleId, orderBy);
};

const uploadFeed = async (userId, description) => {
  return await feedDao.uploadFeed(userId, description);
};

const deleteFeed = async (feedId, userId) => {
  const feed = await feedDao.getFeedById(feedId);
  if (!feed) {
    throw new Error('Post does not exist');
  }

  if (feed.user_id !== userId) {
    throw new Error('User does not match the post id');
  }
  await feedDao.deleteFeed(feedId);
  return { message: 'Feed successfully deleted.' };
};

module.exports = {
  getAllFeed,
  uploadFeed,
  deleteFeed,
};
