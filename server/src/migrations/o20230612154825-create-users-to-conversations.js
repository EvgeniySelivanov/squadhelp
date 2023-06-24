
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_to_conversations', {
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
          model:  'Users',
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
          model:  'conversations',
          key: 'id',
        },
      },
      blackList: {
        type: Sequelize.BOOLEAN,
        field: 'black_list',
        defaultValue: false,
      },
      favoriteList: {
        type: Sequelize.BOOLEAN,
        field: 'favorite_list',
        defaultValue: false,

      },
      createdAt: {
        // field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        // field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users_to_conversations');
  // eslint-disable-next-line comma-dangle
  }
// eslint-disable-next-line eol-last
};