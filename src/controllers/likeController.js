const likeService = require('../services/likeService');
const { catchAsync, BaseError } = require('../utils/error');

const likeFeeds = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { feedId } = req.params;

  const like = await likeService.createLike(userId, feedId);

  res.status(201).json(like);
});

const unlikeFeeds = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { feedId } = req.params;

  const like = await likeService.removeLike(userId, feedId);

  res.status(200).json(like);
});

module.exports = {
  likeFeeds,
  unlikeFeeds
};
