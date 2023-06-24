module.exports = (sequelize, DataTypes) => {
  const SenderToCatalog = sequelize.define(
    'SenderToCatalogs',
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      catalogId: {
        type: DataTypes.INTEGER,
        field: 'catalog_id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
        allowNull: false,
        references: {
          model: {
            tableName: 'CatalogSqls',
          },
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
          model: {
            tableName: 'conversations',
          },
          key: 'id',
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
    { timestamps: true },
  );
  SenderToCatalog.associate = function (models) {
    SenderToCatalog.belongsToMany(models.CatalogSqls, { foreignKey: 'catalog_id' });
  };
  return SenderToCatalog;
};
