const feedDao = require('../models/feedDao');

const getAllFeed = async (offset, limit, genderId, seasonId, styleId, orderBy, userId) => {
  return await feedDao.getAllFeed(offset, limit, genderId, seasonId, styleId, orderBy, userId);
};

const uploadFeed = async (userId, description) => {
  return await feedDao.uploadFeed(userId, description);
};

module.exports = {
  getAllFeed,
  uploadFeed
};
