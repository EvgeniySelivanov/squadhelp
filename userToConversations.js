
module.exports = (sequelize, DataTypes) => {
  const userToConversations = sequelize.define(
    'users_to_conversations',
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
        allowNull: false,
        references: {
          model:  'Users',
          key: 'id',
        },
      },
      conversationId: {
        type: DataTypes.INTEGER,
        field: 'conversation_id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
        allowNull: false,
        references: {
          model:  'conversations',
          key: 'id',
        },
      },
      blackList: {
        type: DataTypes.BOOLEAN,
        field: 'black_list',
        defaultValue: false,
      },
      favoriteList: {
        type: DataTypes.BOOLEAN,
        field: 'favorite_list',
        defaultValue: false,

      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

    },
    { timestamps: true },
  );
  userToConversations.associate = function (models) {
    userToConversations.hasMany(models.User, { foreignKey: 'id' });
  };
  userToConversations.associate = function (models) {
    userToConversations.hasMany(models.Conversation, { foreignKey: 'id' });
  };
  return userToConversations;
};
