
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversations', {
    title:{
      type: DataTypes.STRING,
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

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.User, { foreignKey: 'conversation_id', through: 'users_to_conversations' });
  };
  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.Catalog, { foreignKey: 'conversation_id', through: 'users_conversation_catalogs' });
  };

  return Conversation;
};
