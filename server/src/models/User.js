

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'anon.png',
    },
    role: {
      type: DataTypes.ENUM('customer', 'creator', 'moderator'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  });

  User.associate = function (models) {
    User.hasMany(models.Order, { foreignKey: 'user_id', targetKey: 'id' });
  };
  User.associate = function (models) {
    User.hasMany(models.MessageSql, { foreignKey: 'user_id' });
  };

  User.associate = function (models) {
    User.belongsToMany(models.CatalogSql, { foreignKey: 'user_id', through: 'SenderToCatalogs' });
  };
  User.associate = function (models) {
    User.belongsToMany(models.Conversation, { foreignKey: 'user_id', through: 'SenderToCatalogs' });
  };
  User.associate = function (models) {
    User.belongsToMany(models.Conversation, { foreignKey: 'user_id', through: 'users_to_conversations' });
  };
  User.associate = function (models) {
    User.hasMany(models.Participant,
      { foreignKey: 'user_id', targetKey: 'id' });
  };

  User.associate = function (models) {
    User.hasMany(models.Offer, { foreignKey: 'user_id', targetKey: 'id' });
  };

  User.associate = function (models) {
    User.hasMany(models.RefreshToken,
      { foreignKey: 'user_id', targetKey: 'id' });
  };

  return User;
};
