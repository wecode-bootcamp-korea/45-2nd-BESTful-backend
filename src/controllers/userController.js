const userService = require('../services/userService');
const { catchAsync, BaseError } = require('../utils/error');

const signInKakao = catchAsync(async (req, res) => {
  const { kakaoToken } = req.body;

  if (!kakaoToken) throw new BaseError(401, 'NEED_KAKAOTOKEN');

  const { accessToken, name } = await userService.signInKakao(kakaoToken);

  return res.status(200).json({ token: accessToken, userName: name });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userInfo = await userService.getUserById(userId);

  return res.status(200).json(userInfo);
});

const editUserInfo = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { userName, cellphone, sex, bio } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User Not Found' });
    }

    await userService.editUserInfo(userId, userName, cellphone, sex, bio);

    return res.status(200).json({ message: 'User info updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'Error_editUserInfo/usersController',
    });
  }
});


module.exports = {
  signInKakao,
  getUserById,
  editUserInfo
};
