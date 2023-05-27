const filterBuilder = (genderId, seasonId, styleId, userId, feedId, targetUserId, selectedUserId) => {
  let conditionArr = [];

  if (genderId) {
    conditionArr.push(`u.sex = ${genderId}`);
  }

  if (seasonId) {
    conditionArr.push(`sea.seasons = ${seasonId}`);
  }

  if (styleId) {
    conditionArr.push(`sty.id= ${styleId}`);
  }

  if (userId) {
    conditionArr.push(`f.user_id IN (
      SELECT followed_id
      FROM followers
      WHERE user_id = ${userId}
    )`);
  }

  if (feedId) {
    conditionArr.push(`f.id = ${feedId}`);
  }

  if (targetUserId) {
    conditionArr.push(`f.user_id = ${targetUserId}`);
  }

  if (selectedUserId) {
    conditionArr.push(`l.user_id IN (
      SELECT feed_id
      FROM likes
      WHERE user_id = ${selectedUserId}
    )`);
  }

  let whereCondition = '';

  if (conditionArr.length > 0) {
    whereCondition = `WHERE ${conditionArr.join(' AND ')}`;
  }
  return whereCondition;
};

const limitBuilder = (offset, limit) => {
  if (!limit) limit = 6;

  if (!offset) offset = 0;

  return `LIMIT ${limit} OFFSET ${offset}`;
};

const orderByBuilder = (orderBy) => {
  let orderQuery = '';

  switch (orderBy) {
    case 'likesDesc':
      orderQuery = 'ORDER BY subq.likesCount DESC';
      break;
    default:
      orderQuery = 'ORDER BY subq.createdAt DESC';
      break;
  }
  return orderQuery;
};

module.exports = {
  filterBuilder,
  limitBuilder,
  orderByBuilder,
};
