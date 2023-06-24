const db = require('../models');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/postgresConfig.json');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const controller = require('../socketInit');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);
module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );

  try {
    const getConversationId = await chatQueries.getConversationId(req);
    if (getConversationId.length === 0) {
      const newConversation = await chatQueries.createConversation({
        title: `${req.tokenData.firstName}<-->${req.body.interlocutor.firstName}`,
      });
      await newConversation.addUsers(req.tokenData.userId);
      await newConversation.addUsers(req.body.interlocutor.id);
      const message = await chatQueries.createMessage({
        body: req.body.messageBody,
        userId: req.tokenData.userId,
        conversationId: newConversation.dataValues.id,
      });
      const preview = {
        _id: newConversation.dataValues.id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.dataValues.blackList,
        favoriteList: newConversation.dataValues.favoriteList,
      };
      controller.getChatController().emitNewMessage(req.body.interlocutor.id, {
        message,
        preview: {
          _id: newConversation.dataValues.id,
          sender: req.tokenData.userId,
          text: req.body.messageBody,
          createAt: message.createdAt,
          participants,
          blackList: newConversation.dataValues.blackList,
          favoriteList: newConversation.dataValues.favoriteList,
          interlocutor: {
            id: req.tokenData.userId,
            firstName: req.tokenData.firstName,
            lastName: req.tokenData.lastName,
            displayName: req.tokenData.displayName,
            avatar: req.tokenData.avatar,
            email: req.tokenData.email,
          },
        },
      });
      res.send({
        message,
        preview: Object.assign(preview, {
          interlocutor: req.body.interlocutor,
        }),
      });
    } else {
      const [convId] = await chatQueries.getConversationId(req);
      const message = await chatQueries.createMessage({
        body: req.body.messageBody,
        userId: req.tokenData.userId,
        conversationId: convId.conversation_id,
      });
      const [listState] = await chatQueries.getBlackAndFavoritList(
        convId.conversation_id,
        req.tokenData.userId
      );
      const preview = {
        _id: convId.conversation_id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: listState.black_list,
        favoriteList: listState.favorite_list,
      };
      controller.getChatController().emitNewMessage(req.body.interlocutor.id, {
        message,
        preview: {
          _id: convId.conversation_id,
          sender: req.tokenData.userId,
          text: req.body.messageBody,
          createAt: message.createdAt,
          participants,
          blackList: listState.black_list,
          favoriteList: listState.favorite_list,
          interlocutor: {
            id: req.tokenData.userId,
            firstName: req.tokenData.firstName,
            lastName: req.tokenData.lastName,
            displayName: req.tokenData.displayName,
            avatar: req.tokenData.avatar,
            email: req.tokenData.email,
          },
        },
      });
      res.send({
        message,
        preview: Object.assign(preview, {
          interlocutor: req.body.interlocutor,
        }),
      });
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next();
    } else {
      next(err);
    }
  }
};

module.exports.getChat = async (req, res, next) => {
  const {
    query: { interlocutorId },
  } = req;
  const id = Number(interlocutorId);
  req.body.recipient = id;
  const participants = [req.tokenData.userId, id];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const [convId] = await chatQueries.getConversationId(req);
    let messages;
    if (convId) {
      messages = await db.Messages.findAll({
        where: {
          conversationId: convId.conversation_id,
        },
      });
    } else {
      messages = [];
    }

    const interlocutor = await userQueries.findUser({ id });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    //get my conversations
    const userToConv = await sequelize.query(
      `SELECT * FROM  public.users_to_conversations WHERE  user_id=${req.tokenData.userId}`,
      { type: sequelize.QueryTypes.SELECT }
    );
    const arrIdMyConv = [];
    if (userToConv.length != 0) {
      userToConv.forEach((element) => {
        arrIdMyConv.push(element.conversation_id);
      });
    }
    const interlocutors = [];
    //get id interlocutor
    if (arrIdMyConv.length != 0) {
      const interlocutorId = await sequelize.query(
        `SELECT user_id 
      FROM  public.users_to_conversations WHERE conversation_id IN (${arrIdMyConv}) 
      AND
       user_id!=${req.tokenData.userId}`,
        { type: sequelize.QueryTypes.SELECT }
      );
      interlocutorId.forEach((element) => {
        interlocutors.push(element.user_id);
      });
    }
    //converstations interlocutors
    if (interlocutors.length) {
      const interlocutorToConv = await sequelize.query(
        `SELECT *  
      FROM public."users_to_conversations" as "UTC"
      JOIN public."Users" AS "Users" ON "Users"."id"="UTC"."user_id"
      WHERE "UTC"."user_id" IN (${interlocutors});`,
        { type: sequelize.QueryTypes.SELECT }
      );
      userToConv.forEach((conversation) => {
        interlocutorToConv.forEach((elem) => {
          if (conversation.conversation_id === elem.conversation_id) {
            conversation.interlocutor = {
              id: elem.user_id,
              firstName: elem.firstName,
              lastName: elem.lastName,
              displayName: elem.displayName,
              avatar: elem.avatar,
              black_list: elem.black_list,
              favorite_list: elem.favorite_list,
            };
            conversation.participants = [conversation.user_id, elem.user_id];
            if (req.tokenData.role === 'creator') {
              conversation.blackList = [
                conversation.black_list,
                elem.black_list,
              ];
            } else if (req.tokenData.role === 'customer') {
              conversation.blackList = [
                elem.black_list,
                conversation.black_list,
              ];
            }
          }
        });
      });

      res.send(userToConv);
    } else {
      res.send(userToConv);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    await sequelize.query(
      `UPDATE public."users_to_conversations"
      SET "black_list"=${req.body.blackListFlag}
       WHERE  user_id=${req.tokenData.userId}
       AND "conversation_id"=${req.body.conversation_id}`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const [getBlackAndFavoritList] = await chatQueries.getBlackAndFavoritList(
      req.body.conversation_id,
      req.tokenData.userId
    );
    const [getInterlocutorBlackAndFavoritList] =
      await chatQueries.getBlackAndFavoritList(
        req.body.conversation_id,
        req.body.interlocutor.id
      );
    getBlackAndFavoritList.participants = req.body.participants;
    if (req.body.role === 'creator') {
      getBlackAndFavoritList.blackList = [
        getBlackAndFavoritList.black_list,
        getInterlocutorBlackAndFavoritList.black_list,
      ];
    } else {
      getBlackAndFavoritList.blackList = [
        getInterlocutorBlackAndFavoritList.black_list,
        getBlackAndFavoritList.black_list,
      ];
    }
    getBlackAndFavoritList.conversation_id = req.body.conversation_id;
    getBlackAndFavoritList.role = req.body.role;
    getBlackAndFavoritList.interlocutor = req.body.interlocutor;
    console.log('getBlackAndFavoritList', getBlackAndFavoritList);
    res.send(getBlackAndFavoritList);
    controller
      .getChatController()
      .emitChangeBlockStatus(
        req.body.interlocutor.id,
        getBlackAndFavoritList.blackList
      );
  } catch (err) {
    res.send(err);
  }
};
//favoriteChat very long.... because i did response 'chatPreview' such as in blackList
module.exports.favoriteChat = async (req, res, next) => {
  try {
    await sequelize.query(
      `UPDATE public."users_to_conversations"
      SET "favorite_list"=${req.body.favoriteFlag}
       WHERE  user_id=${req.tokenData.userId}
       AND "conversation_id"=${req.body.conversation_id}`,
      { type: sequelize.QueryTypes.SELECT }
    );
    const [getBlackAndFavoritList] = await chatQueries.getBlackAndFavoritList(
      req.body.conversation_id,
      req.tokenData.userId
    );
    const [getInterlocutorBlackAndFavoritList] =
      await chatQueries.getBlackAndFavoritList(
        req.body.conversation_id,
        req.body.interlocutor.id
      );
    getBlackAndFavoritList.participants = req.body.participants;
    if (req.body.role === 'creator') {
      getBlackAndFavoritList.blackList = [
        getBlackAndFavoritList.black_list,
        getInterlocutorBlackAndFavoritList.black_list,
      ];
    } else {
      getBlackAndFavoritList.blackList = [
        getInterlocutorBlackAndFavoritList.black_list,
        getBlackAndFavoritList.black_list,
      ];
    }
    getBlackAndFavoritList.conversation_id = req.body.conversation_id;
    getBlackAndFavoritList.role = req.body.role;
    getBlackAndFavoritList.interlocutor = req.body.interlocutor;
    res.send(getBlackAndFavoritList);
  } catch (err) {
    res.send(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await db.CatalogSqls.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    });
    catalog.dataValues.chats = [req.body.chatId];
    const senderToCatalog = await db.SenderToCatalogs.create({
      userId: req.tokenData.userId,
      conversationId: req.body.chatId,
      catalogId: catalog.dataValues.id,
    });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};
module.exports.getCatalogs = async (req, res, next) => {
  try {
    console.log('reqBody getCatalog', req.body);
    let catalogs = await sequelize.query(
      `SELECT *
      FROM public."SenderToCatalogs" as "STC"
      JOIN public."CatalogSqls" AS "CS" ON "CS"."id"="STC"."catalog_id"
       WHERE  "STC"."user_id"=${req.tokenData.userId}
      GROUP BY "STC"."catalog_id","STC"."id","CS"."id"`,
      { type: sequelize.QueryTypes.SELECT }
    );
    catalogs.forEach((element) => {
      element.chats = [];
      element.chats.push(element.conversation_id);
    });
    for (let i = 0; i < catalogs.length; i++) {
      if (i === catalogs.length - 1) {
        break;
      }
      for (let j = 0; j < catalogs.length; j++) {
        if (
          catalogs[i].catalog_id === catalogs[j].catalog_id &&
          catalogs[j].chats.length > 0
        ) {
          catalogs[i].chats.push(catalogs[j].chats[0]);
          delete catalogs[j].chats[0];
        }
      }
    }
    catalogs.forEach((element) => {
      element.chats = [...new Set(element.chats)];
      element.chats = element.chats.filter((elem) => elem !== undefined);
    });
    catalogs = catalogs.filter((elem) => elem.chats.length !== 0);
    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const newName = await db.CatalogSqls.findByPk(req.body.catalogId);
    if (newName) {
      newName.dataValues.catalogName = req.body.catalogName;
      await newName.save();
      newName.dataValues.chats = await chatQueries.findChatInCatalog(
        req.body.catalogId,
      );
      newName.dataValues._id = newName.dataValues.id;
      delete newName.dataValues.id;
      res.send(newName);
    } else {
      console.log('Model not found.');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await db.CatalogSqls.findByPk(req.body.catalogId);
    if (catalog) {
      const newChatToCatalog = await db.SenderToCatalogs.create({
        userId: req.tokenData.userId,
        conversationId: req.body.chatId,
        catalogId: req.body.catalogId,
      });
      newChatToCatalog.dataValues.chats = await chatQueries.findChatInCatalog(
        req.body.catalogId,
      );
      newChatToCatalog.dataValues._id = newChatToCatalog.dataValues.catalogId;
      newChatToCatalog.dataValues.catalogName = catalog.dataValues.catalogName;
      delete newChatToCatalog.dataValues.catalogId;
      delete newChatToCatalog.dataValues.id;
      res.send(newChatToCatalog);
    } else {
      console.log('Catalog not found >>>>');
    }
  } catch (err) {
    next(err);
  }
};
module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const chatInCatalog = await db.SenderToCatalogs.destroy({
      where: {
        [Op.and]: [
          { catalogId: req.body.catalogId },
          { conversationId: req.body.chatId },
          { userId: req.tokenData.userId },
        ],
      },
    });
    const catalog = await db.CatalogSqls.findByPk(req.body.catalogId);
    const sendToClient = {
      chats: await chatQueries.findChatInCatalog(req.body.catalogId),
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
      catalogName: catalog.dataValues.catalogName,
    };

    res.send(sendToClient);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteCatalog = async (req, res, next) => {
  try {
    console.log('req delete>>>>>>', req.body);
    await db.SenderToCatalogs.destroy({
      where: {
        [Op.and]: [
          { catalogId: req.body.catalogId },
          { userId: req.tokenData.userId },
        ],
      },
    });
    await db.CatalogSqls.destroy({
      where: {
        [Op.and]: [
          { id: req.body.catalogId },
          { userId: req.tokenData.userId },
        ],
      },
    });
    const catalog = {
      _id: req.body.catalogId,
    };
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};
