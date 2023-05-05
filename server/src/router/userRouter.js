const { Router } = require('express');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

const userRouter = Router();

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);
userRouter.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

userRouter.get(
  '/getUser',
  checkToken.checkAuth,
);
userRouter.patch(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);
userRouter.patch(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);
userRouter.patch(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);
userRouter.patch(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);
module.exports = userRouter;