const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { NOT_FOUND_404 } = require('../constants/constants');
const { userDataValidation } = require('../utils/validations/userJoi');

router.post('/signin', userDataValidation, login);
router.post('/signup', userDataValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (_, res) => { res.status(NOT_FOUND_404).send({ message: 'Страница не найдена' }); });

module.exports = router;
