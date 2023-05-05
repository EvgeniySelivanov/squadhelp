const { Router } = require('express');
const userRouter = require('./userRouter');

const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');

const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');

const router = Router();
router.use('/', userRouter);








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

module.exports = router;
