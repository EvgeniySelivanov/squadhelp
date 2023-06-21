const db = require('../models');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/postgresConfig.json');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const controller = require('../socketInit');
// const ServerError = require('../errors/ServerError');
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
        favoriteList:listState.favorite_list,
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
          conversation.participants=[conversation.user_id, elem.user_id]
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
    getBlackAndFavoritList.interlocutor=req.body.interlocutor;
    res.send(getBlackAndFavoritList);
    controller
      .getChatController()
      .emitChangeBlockStatus(
        req.body.interlocutor.id,
        getBlackAndFavoritList.blackList,
      );
  } catch (err) {
    res.send(err);
  }
};
