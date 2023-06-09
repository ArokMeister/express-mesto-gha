const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { userRegisterValidation, userLoginValidation } = require('../utils/validations/userJoi');
const NotFoundError = require('../utils/customError/NotFoundError');

router.post('/signin', userLoginValidation, login);
router.post('/signup', userRegisterValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = router;
