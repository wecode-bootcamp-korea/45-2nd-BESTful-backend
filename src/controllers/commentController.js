const commentService = require('../services/commentService');
const { catchAsync, BaseError } = require('../utils/error');

const getCommentByFeedId = catchAsync(async (req, res) => {
  const { feedId } = req.params;

  if (!feedId) throw new BaseError(401, 'EMPTY_KEY');

  const result = await commentService.getCommentByFeedId(feedId);

  return res.status(200).json(result);
});

module.exports = {
  getCommentByFeedId,
};
