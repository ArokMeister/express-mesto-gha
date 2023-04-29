const userRouter = require('express').Router({ credentials: 'include' });
const {
  getUser, getAllUsers, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const {
  userInfoValidation, userAvatarValidation, userIdValidation,
} = require('../utils/validations/userJoi');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getMe);
userRouter.get('/:id', userIdValidation, getUser);
userRouter.patch('/me', userInfoValidation, updateUser);
userRouter.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = userRouter;
