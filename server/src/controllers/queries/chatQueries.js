const db = require('../../models');
const { Sequelize } = require('sequelize');
const config = require('../../config/postgresConfig.json');
const ServerError = require('../../errors/ServerError');
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);
module.exports.createConversation = async (data) => {
  const result = await db.conversations.create(data);
  if (!result) {
    throw new ServerError('cannot create new Conversation');
  } else {
    return result;
  }
};

module.exports.getConversationId = async (req) => {
  const getConversation = await sequelize.query(
    `SELECT conversation_id
     FROM  public.users_to_conversations
      WHERE  user_id IN (${req.tokenData.userId}, ${req.body.recipient}) 
      GROUP BY conversation_id
      HAVING COUNT(DISTINCT user_id) = 2 `,
    { type: sequelize.QueryTypes.SELECT }
  );
  if (!getConversation) {
    throw new ServerError('cannot create new Conversation');
  } else {
    return getConversation;
  }
};
module.exports.createMessage = async (data) => {
  const result = await db.Messages.create(data);
  if (!result) {
    throw new ServerError('cannot create new Message');
  } else {
    return result;
  }
};
module.exports.getBlackAndFavoritList = async (conversationId, userId) => {
  const result = await sequelize.query(
    `SELECT black_list,favorite_list
     FROM  public.users_to_conversations 
    WHERE conversation_id = ${conversationId} 
    AND user_id=${userId}`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return result;
};
module.exports.findChatInCatalog = async (id) => {
  const chats = await db.SenderToCatalogs.findAll({
    attributes: ['conversation_id'],
    where: {
      catalogId:id,
    },
  });
  const sendChats = [];
  chats.forEach((element) => {
    sendChats.push(element.dataValues.conversation_id);
  });
  return sendChats;
};
