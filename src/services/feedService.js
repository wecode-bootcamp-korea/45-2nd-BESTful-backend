const feedDao = require('../models/feedDao');

const getAllFeed = async (offset, limit, genderId, seasonId, styleId, orderBy) => {
  return await feedDao.getAllFeed(offset, limit, genderId, seasonId, styleId, orderBy);
};

module.exports = {
  getAllFeed,
};
