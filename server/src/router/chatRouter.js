const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.get(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);
chatRouter.get(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);
chatRouter.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);
chatRouter.patch(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);
chatRouter.patch(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);
chatRouter.get(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);
chatRouter.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);
chatRouter.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);
chatRouter.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);
chatRouter.patch(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);
chatRouter.patch(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);



module.exports = chatRouter;
