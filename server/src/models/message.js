
module.exports = (sequelize, DataTypes) => {
  const MessageSql = sequelize.define('Messages', {
    // userId: {
    //   field: 'user_id',
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Users',
    //     key: 'id',
    //   },
    // },
    // conversationId: {
    //   field: 'conversation_id',
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'conversations',
    //     key: 'id',
    //   },
    // },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:DataTypes.NOW,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:DataTypes.NOW,
    },
    timestamps:true,
  },
  );
  MessageSql.associate = function (models) {
    MessageSql.belongsTo(models.User, { foreignKey: 'user_id', through: 'users_to_conversations' });
  };

  return MessageSql;
};
