const db = require('../../models');
const { Op } = require('sequelize');

const ServerError = require('../../errors/ServerError');

module.exports.createConversation = async (data) => {
  const result = await db.conversations.create(data);
  if (!result) {
    throw new ServerError('cannot create new Conversation');
  } else {
    // return result.get({ plain: true });
    return result;
  }
};

module.exports.checkConversation = async (req) => {

};

module.exports.getConversationId = async (req) => {

  const usersNoRecepients = await db.Users.findAll({
    where: {
      [Op.and]: [
        { id: { [Op.ne]: req.tokenData.userId } },
        { id: { [Op.ne]: req.body.recipient } },
      ],
    },
  });

  const arrIdUsersNoRecepients=[];
  usersNoRecepients.forEach(user => {
    arrIdUsersNoRecepients.push(user.dataValues.id);
  });
  const getConversation = await db.Messages.findAll({
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
          [Op.and]: [
            { userId: { [Op.eq]: req.tokenData.userId } },
            { userId: { [Op.notIn]: arrIdUsersNoRecepients } },
          ],
        },
      ],
    },
  });
  return getConversation;
};
module.exports.createMessage = async (data) => {
  const result = await db.Messages.create(data);
  if (!result) {
    throw new ServerError('cannot create new Message');
  } else {
    return result;
  }
};
