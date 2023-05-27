const feedService = require('../services/feedService');
const { catchAsync } = require('../utils/error');

const getAllFeed = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId, orderBy } = req.query;
  const { feedId, targetUserId } = req.params;

  const DEFAULT_LIMIT = 3;

  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(
    feedId,
    targetUserId,
    offset,
    limit,
    genderId,
    seasonId,
    styleId,
    orderBy
  );

  return res.status(200).json(result);
});

const getAllFeedFollowings = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId, orderBy } = req.query;
  const userId = req.user.id;

  const DEFAULT_LIMIT = 3;

  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(offset, limit, genderId, seasonId, styleId, orderBy, userId);

  return res.status(200).json(result);
});

const uploadFeed = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { description } = req.body;

  const result = await feedService.uploadFeed(userId, description);

  return res.status(201).json({ feed: result });
});

module.exports = {
  getAllFeed,
  getAllFeedFollowings,
  uploadFeed,
};
