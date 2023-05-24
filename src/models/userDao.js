const dataSource = require('./dataSource');
const { DatabaseError } = require('../utils/error');

const getUserByKakaoId = async (kakaoId) => {
  try {
    const [user] = await dataSource.query(
      `
    SELECT
      id,
      email,
      user_name
    FROM users
    WHERE kakao_id  = ?
    `,
      [kakaoId]
    );

    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error');
  }
};

const createUser = async (kakaoId, userName, email) => {
  try {
    await dataSource.query(
      `
      INSERT INTO users(
        kakao_id,
        user_name,
        email
      )
      VALUES (?, ?, ?)
      `,
      [kakaoId, userName, email]
    );

    const user = await dataSource.query(
      `
      SELECT *
      FROM users
      WHERE kakao_id = ?
      `,
      [kakaoId]
    );
    return user;
  } catch (err) {
    throw new DatabaseError('DataSource_Error: ' + err.message);
  }
};

const getUserById = async (userId) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT
        id,
        email,
        user_name userName,
        profile_image_url profileImageUrl,
        sex,
        bio
      FROM users
      WHERE id = ?
      `,
      [userId]
    );
    return user;
  } catch (error) {
    throw new DatabaseError('DataSource_Error');
  }
};

module.exports = {
  getUserByKakaoId,
  getUserById,
  createUser
};
