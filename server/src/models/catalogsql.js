module.exports = (sequelize, DataTypes) => {
  const CatalogSql = sequelize.define(
    'CatalogSqls',
    {
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      catalogName: {
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
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: true }
  );
  CatalogSql.associate = function (models) {
    CatalogSql.belongsTo(models.User, {
      foreignKey: 'catalog_id',
      through: 'SenderToCatalogs',
    });
  };
  CatalogSql.associate = function (models) {
    CatalogSql.belongsToMany(models.SenderToCatalog, { foreignKey: 'catalog_id' });
  };
  CatalogSql.associate = function (models) {
    CatalogSql.belongsToMany(models.Conversation, {
      foreignKey: 'catalog_id',
    });
  };
  return CatalogSql;
};
