const dataSource = require('../models/dataSource');
const { DatabaseError } = require('../utils/error');

const getCommentByFeedId = async (feedId) => {
  try {
    return await dataSource.query(
      `
      SELECT
      c.contents,
      u.user_name,
      u.profile_image_url,
      date_format(c.created_at, '%Y.%m.%d.%H.%i') createdAt
      FROM comments c
      JOIN users u ON u.id = c.user_id
      JOIN feed f ON c.feed_id = f.id
      WHERE c.feed_id = ?
      ORDER BY c.created_at
    `,
      [feedId]
    );
  } catch (error) {
    console.log(error);
    throw new DatabaseError('CAN_NOT_GET_COMMENTS');
  }
};

module.exports = {
  getCommentByFeedId,
};
