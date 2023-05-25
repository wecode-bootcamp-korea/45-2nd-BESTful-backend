const filterBuilder = (genderId, seasonId, styleId) => {
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

module.exports = {
  filterBuilder,
  limitBuilder,
};
