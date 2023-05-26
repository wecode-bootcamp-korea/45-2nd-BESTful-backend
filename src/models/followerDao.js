const dataSource = require('./dataSource');
const { DatabaseError } = require('../utils/error');

const followUser = async (userId, followedId) => {
  try {
    await dataSource.query(
      `
    INSERT INTO followers (user_id, followed_id)
    VALUES (?, ?)
    `,
      [userId, followedId]
    );
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

module.exports = {
  followUser
};