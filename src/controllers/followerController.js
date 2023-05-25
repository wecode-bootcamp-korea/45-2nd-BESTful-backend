const followerService = require('../services/followerService');
const { catchAsync, BaseError } = require('../utils/error');

const followUser = async (req, res, next) => {
  const userId = req.user.id;
  const { followedId } = req.body;

  try {
    const result = await followerService.followUser(userId, followedId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const unfollowUser = async (req, res, next) => {
  const userId = req.user.id;
  const { followedId } = req.body;

  try {
    const result = await followerService.unfollowUser(userId, followedId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  followUser,
  unfollowUser
};   
