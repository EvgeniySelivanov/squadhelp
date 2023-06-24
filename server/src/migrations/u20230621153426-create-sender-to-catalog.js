module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SenderToCatalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),

      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),


      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SenderToCatalogs');
  },
};
