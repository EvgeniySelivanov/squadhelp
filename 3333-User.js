module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'buyer1',
        lastName: 'buyer1',
        email: 'buyer1@gmail.com',
        displayName: 'buyer1',
        password: 'has',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        firstName: 'creative1',
        lastName: 'creative1',
        email: 'creative1@gmail.com',
        displayName: 'moderator1',
        password: 'has',
        role: 'creator',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        firstName: 'moderator1',
        lastName: 'moderator1',
        email: 'moderator1@gmail.com',
        displayName: 'moderator1',
        password: 'has',
        role: 'moderator',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
