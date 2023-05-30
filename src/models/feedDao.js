const { DatabaseError } = require('../utils/error');
const dataSource = require('./dataSource');
const builder = require('./builder');

const getAllFeed = async (userId, feedId, targetUserId, selectedUserId, offset, limit, genderId, seasonId, styleId, orderBy) => {
  try {
    const baseQuery = `
      SELECT
      subq.userId,
      subq.userId,
      subq.feedId,
      subq.userName,
      subq.profileImageUrl,
      subq.feedDescription,
      subq.createdAt,
      subq.likesCount,
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'contentUrl', subq.contentUrl,
            'clothesInfo', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'coordinateX', t.coordinate_x,
                        'coordinateY', t.coordinate_y,
                        'tagContent', t.contents,
                        'clothName', c.name,
                        'clothInformation', c.information,
                        'clothBuyingLink', c.buying_link,
                        'clothPrice', c.price,
                        'season', sea.seasons,
                        'style', sty.style
                      )
                  ) 
            FROM tags t
            JOIN clothes c ON t.cloth_id = c.id
            JOIN seasons sea ON c.season_id = sea.id
            JOIN styles sty ON c.style_id = sty.id
            WHERE t.content_file_id = subq.contentFileId
          )
        )
      ) AS contentUrls
        FROM (
            SELECT
                u.id AS userId,
                f.id AS feedId,
                u.user_name AS userName,
                u.profile_image_url profileImageUrl,
                f.description AS feedDescription,
                DATE_FORMAT(f.created_at, '%Y.%m.%d') AS createdAt,
                c_f.content_url AS contentUrl,
                c_f.id AS contentFileId,
                COUNT(DISTINCT l.id) likesCount
            FROM feed f
            JOIN users u ON u.id = f.user_id
            JOIN content_files c_f ON c_f.feed_id = f.id
            LEFT JOIN likes l ON l.feed_id = f.id
            JOIN tags t ON c_f.id = t.content_file_id
            JOIN clothes c ON t.cloth_id = c.id
            JOIN seasons sea ON c.season_id = sea.id
            JOIN styles sty ON c.style_id = sty.id  
        `;

    const whereCondition = builder.filterBuilder(genderId, seasonId, styleId, userId, feedId, targetUserId, selectedUserId);
    const sortQuery = builder.orderByBuilder(orderBy);
    const limitQuery = builder.limitBuilder(offset, limit);
    const groupByQuery = ` 
    GROUP BY 
    f.id, 
    u.user_name, 
    u.profile_image_url, 
    f.description, 
    DATE_FORMAT(f.created_at, '%Y.%m.%d'),
    c_f.content_url, 
    c_f.id
    ) AS subq 
    GROUP BY 
    subq.userId,
    subq.feedId, 
    subq.userName, 
    subq.profileImageUrl, 
    subq.feedDescription, 
    subq.createdAt,
    subq.likesCount`;

    const rooms = await dataSource.query(`${baseQuery} ${whereCondition} ${groupByQuery} ${sortQuery} ${limitQuery}`);

    return rooms;
  } catch (error) {
    console.log(error);
    throw new DatabaseError();
  }
};

const uploadFeed = async (userId, feedDescription) => {
  try {
    const resultFeed = await dataSource.query(
      `INSERT INTO feed (user_id, description) VALUES (?, ?)`,
      [userId, feedDescription]
    );
    const feedId = resultFeed.insertId;

    return { feedId };
  } catch (error) {
    console.log(error);
    throw new DatabaseError('CAN_NOT_UPLOAD_FEED');
  }
};

const uploadContentFile = async (feedId, contentUrl) => {
  try {
    const resultContentFile = await dataSource.query(
      `INSERT INTO content_files (feed_id, content_url) VALUES (?, ?)`,
      [feedId, contentUrl]
    );
    const contentFileId = resultContentFile.insertId;

    return { contentFileId };
  } catch (error) {
    console.log(error);
    throw new DatabaseError('CAN_NOT_UPLOAD_CONTENT_FILE');
  }
};

const createTag = async (contentFileId, clothName, clothPrice, tagContent, coordinateX, coordinateY, clothBuyingLink, clothInformation, styleName, seasonName) => {
  try {
    const [cloth] = await dataSource.query(`
      SELECT id FROM clothes WHERE name = ?
    `, [clothName])

    const [style] = await dataSource.query(`
      SELECT id FROM styles WHERE style = ?
    `, [styleName])

    const [season] = await dataSource.query(`
      SELECT id FROM seasons WHERE seasons = ?
    `, [seasonName])

    if (!cloth | !style | !season) throw new Error()

    const result = await dataSource.query(
      `INSERT INTO tags (content_file_id, cloth_id, coordinate_x, coordinate_y, contents) 
        VALUES (?, ?, ?, ?, ?)`,
      [contentFileId, cloth.id, coordinateX, coordinateY, tagContent]
    );

    await dataSource.query(
      `INSERT INTO clothes (name, price, buying_link, information, style_id, season_id) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [clothName, clothPrice, clothBuyingLink, clothInformation, style.id, season.id]
    );
  } catch (error) {
    console.log(error);
    throw new DatabaseError('CAN_NOT_CREATE_TAG');
  }
};

const deleteFeed = async (feedId) => {
  const result = await dataSource.query('DELETE FROM feed WHERE id = ?', [feedId]);
  return result;
};

module.exports = {
  getAllFeed,
  uploadFeed,
  uploadContentFile,
  createTag,
  deleteFeed
};
