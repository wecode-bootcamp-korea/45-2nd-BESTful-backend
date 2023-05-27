const feedDao = require('../models/feedDao');

const getAllFeed = async (
  feedId,
  targetUserId,
  selectedUserId,
  offset,
  limit,
  genderId,
  seasonId,
  styleId,
  orderBy,
  userId
) => {
  return await feedDao.getAllFeed(
    feedId,
    targetUserId,
    selectedUserId,
    offset,
    limit,
    genderId,
    seasonId,
    styleId,
    orderBy,
    userId
  );
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
  deleteFeed
};
