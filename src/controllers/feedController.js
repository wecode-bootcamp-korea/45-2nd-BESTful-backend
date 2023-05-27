const feedService = require('../services/feedService');
const { catchAsync } = require('../utils/error');

const getAllFeed = catchAsync(async (req, res) => {
  const { from, count, genderId, seasonId, styleId, orderBy } = req.query;

  const DEFAULT_LIMIT = 6;

  const DEFAULT_OFFSET = 0;

  const offset = from ? from : DEFAULT_OFFSET;
  const limit = count ? count : DEFAULT_LIMIT;

  const result = await feedService.getAllFeed(offset, limit, genderId, seasonId, styleId, orderBy);

  return res.status(200).json(result);
});

module.exports = { getAllFeed };
