const { Router } = require('express');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const chatRouter = require('./contestRouter');

const router = Router();
router.use('/', userRouter);
router.use('/', contestRouter);
router.use('/', chatRouter);

<<<<<<< HEAD
router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.get(
  '/getUser',
  checkToken.checkAuth,
);

router.patch(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);
router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);
router.patch(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);
router.post(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.patch(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);
router.patch(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.get(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);
router.get(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);
router.patch(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);
router.patch(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);
router.patch(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);
router.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);
router.patch(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);
router.patch(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);
router.get(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);
router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);
router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);
router.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);
router.patch(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);
router.patch(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

router.get(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);
router.get(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);
router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);
=======
>>>>>>> task-3

module.exports = router;
