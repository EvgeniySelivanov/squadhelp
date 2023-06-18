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

  const checkConversation = await db.Messages.findAll({
    attributes: ['conversation_id'],
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { userId: req.tokenData.userId },
            { userId: req.body.recipient },
          ],
        },
        {
          userId: req.tokenData.userId,
        },
      ],
    },
  });
  console.log('checkConversation>>>>>', checkConversation);
  try {
    if (checkConversation.length === 0) {
      console.log('new chat');
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
      console.log('old chat');
      const message = await chatQueries.createMessage({
        body: req.body.messageBody,
        userId: req.tokenData.userId,
        conversationId: convId.dataValues.conversation_id,
      });
      const preview = {
        _id: convId.dataValues.conversation_id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: 'false',
        favoriteList: 'false',
      };
      controller.getChatController().emitNewMessage(req.body.interlocutor.id, {
        message,
        preview: {
          _id: chatQueries.getConversationId,
          sender: req.tokenData.userId,
          text: req.body.messageBody,
          createAt: message.createdAt,
          participants,
          blackList: 'false',
          favoriteList: 'false',
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
  // console.log('getChat req>>>>', req.query);
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
    // const [test]=conversationId;
    // console.log('convId>>>>', convId);
    let messages;
    if (convId) {
      messages = await db.Messages.findAll({
        where: {
          conversationId: convId.dataValues.conversation_id,
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
    //messages this user
    const conversations = await db.Messages.findAll({
      where: { userId: req.tokenData.userId },
    });
    console.log('getPreview messages this user>>>>>>>', conversations);
    //id conversations this user
    const arrConversation = [];
    conversations.forEach((conversation) => {
      arrConversation.push(conversation.dataValues.conversationId);
    });
    await console.log(
      'getPreview id conversations this user>>>>',
      arrConversation
    );
    const interlocutors = [];
    //messages  interlocutor
    const arrConversation2 = await db.Messages.findAll({
      where: {
        [Op.and]: [
          { userId: { [Op.ne]: req.tokenData.userId } },
          { conversationId: { [Op.in]: arrConversation } },
        ],
      },
    });
    //id interlocutors
    arrConversation2.forEach((conversation) => {
      interlocutors.push(conversation.dataValues.user_id);
    });

    await console.log('getPreview interlocutors>>>>', interlocutors);
    const senders = await db.Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    console.log('senders in chatPreview>>>>>>>>', senders);

    const userToConv = await sequelize.query(
      `SELECT * FROM  public.users_to_conversations WHERE conversation_id IN (${arrConversation})`,
      { type: sequelize.QueryTypes.SELECT }
    );

    console.log('userToConv>>>>>>>', userToConv);
    userToConv.forEach((conversation) => {
      senders.forEach((sender) => {
        if (conversation.user_id == sender.dataValues.id) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    res.send(userToConv);
  } catch (err) {
    next(err);
  }
};
