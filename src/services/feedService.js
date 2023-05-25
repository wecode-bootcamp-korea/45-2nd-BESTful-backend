const feedDao = require('../models/feedDao');

const getAllFeed = async (offset, limit, genderId, seasonId, styleId) => {
  return await feedDao.getAllFeed(offset, limit, genderId, seasonId, styleId);
};

module.exports = {
  getAllFeed,
};
