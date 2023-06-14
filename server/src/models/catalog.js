
module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalogs', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    timestamps: true,
  },
  );
  Catalog.associate = function (models) {
    Catalog.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Catalog;
};
