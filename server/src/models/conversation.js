
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Conversation.init(
    {
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        field: 'owner_id',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      underscored:true,
      tableName: 'conversations',
    });
  return Conversation;
};