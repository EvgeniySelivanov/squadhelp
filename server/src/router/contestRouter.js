const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');

const contestRouter = Router();


contestRouter.patch(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

contestRouter.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

contestRouter.patch(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);
contestRouter.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);
contestRouter.get(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

contestRouter.get(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);
contestRouter.get(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

contestRouter.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

module.exports = contestRouter;
