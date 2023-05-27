const { DatabaseError } = require('../utils/error');
const dataSource = require('./dataSource');
const builder = require('./builder');

const getAllFeed = async (offset, limit, genderId, seasonId, styleId, orderBy, userId) => {
  try {
    const baseQuery = `
      SELECT
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

    const whereCondition = builder.filterBuilder(genderId, seasonId, styleId, userId);
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
    throw new DatabaseError('CAN_NOT_GET_FEEDS');
  }
};


const uploadFeed = async (userId, description) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO feed (user_id, description) VALUES (?, ?)`,
      [userId, description]
    );

    return result;
  } catch (error) {
    console.log(error);
    throw new DatabaseError('CAN_NOT_UPLOAD_FEED');
  }
};

module.exports = {
  getAllFeed,
  uploadFeed
};
