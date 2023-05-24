const userDao = require('../models/userDao');
const { BaseError } = require('../utils/error');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const { validateUserName } = require('../utils/validationCheck');

const signInKakao = async (kakaoToken) => {
  const result = await axios.post('https://kapi.kakao.com/v2/user/me', null, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  if (result.status !== 200) {
    throw new BaseError('INVALID_KAKAO_TOKEN', 401);
  }
  const { data } = result;

  const userName = data.properties.nickname;

  const userDao = require('../models/userDao');
  const { BaseError } = require('../utils/error');
  const axios = require('axios');
  const jwt = require('jsonwebtoken');

  const signInKakao = async (kakaoToken) => {
    const result = await axios.post('https://kapi.kakao.com/v2/user/me', null, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoToken}`,
      },
    });

    if (result.status !== 200) {
      throw new BaseError('INVALID_KAKAO_TOKEN', 401);
    }
    const { data } = result;

    const nickname = data.properties.nickname;
    const email = data.kakao_account.email;
    const kakaoId = data.id;

    let user = await userDao.getUserByKakaoId(kakaoId);

    if (!user) {
      user = await userDao.createUser(kakaoId, nickname, email);
    }

    const payLoad = { id: user.id };

    const accessToken = jwt.sign(payLoad, process.env.SECRET_KEY);
    const name = user.nickname;
    return { accessToken: accessToken, nickname: name };
  };

  const getUserById = async (userId) => {
    return await userDao.getUserById(userId);
  };

  const editUserInfo = async (userId, userName, cellphone, sex, bio) => {
    try {
      await getUserById(userId);
      const editUserInfo = await userDao.editUserInfo(
        userId,
        userName,
        cellphone,
        sex,
        bio
      );
      return editUserInfo;
    } catch (err) {
      throw new Error("Error_ editUserInfo /usersService " + err.message);
    }
  };

  module.exports = {
    signInKakao,
    getUserById,
    editUserInfo
  };

  const nickname = data.properties.nickname;
  const email = data.kakao_account.email;
  const kakaoId = data.id;

  let user = await userDao.getUserByKakaoId(kakaoId);

  if (!user) {
    user = await userDao.createUser(kakaoId, userName, email);
  }

  const payLoad = { id: user.id };

  const accessToken = jwt.sign(payLoad, process.env.SECRET_KEY);
  const name = user.userName;
  return { accessToken: accessToken, userName: name };
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const editUserInfo = async (userId, userName, cellphone, sex, bio) => {
  try {
    if (userName && !await validateUserName(userName)) {
      throw new Error('Invalid user name');
    }

    const currentUserData = await userDao.getUserById(userId);
    if (!currentUserData) {
      throw new Error('User not found');
    }

    userName = userName || currentUserData.userName;
    cellphone = cellphone || currentUserData.cellphone;
    sex = sex || currentUserData.sex;
    bio = bio || currentUserData.bio;

    await userDao.editUserInfo(userId, userName, cellphone, sex, bio);

    return userDao.getUserById(userId);
  } catch (err) {
    console.error(err);
    throw new Error("Error updating user info: " + err.message);
  }
};

const uploadImageUrl = async (userId, profileImageUrl) => {
  try {
    await userDao.uploadImageUrl(userId, profileImageUrl);
    return;
  } catch (err) {
    throw new Error("Error uploading image in uploadImage: " + err.message);
  }
};


module.exports = {
  signInKakao,
  getUserById,
  editUserInfo,
  uploadImageUrl
};
