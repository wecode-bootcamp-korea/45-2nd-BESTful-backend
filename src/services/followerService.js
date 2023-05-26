const followerDao = require('../models/followerDao');
const { BaseError } = require('../utils/error');

const followUser = async (userId, followedId) => {
  if (userId === followedId) {
    throw new BaseError('You cannot follow yourself.');
  }

  try {
    await followerDao.followUser(userId, followedId);
  } catch (err) {
    throw new BaseError('Failed to follow user.');
  }

  return { message: 'Successfully followed user.' };
};

module.exports = {
  followUser
};