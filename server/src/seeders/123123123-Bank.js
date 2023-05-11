module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [
      {
        cardNumber: '4564654564564564',
        name: 'SquadHelp',
        expiry: '11/22',
        cvc: '453',
        balance: 0,
      },
      {
        cardNumber: '4111111111111111',
        name: 'buyer',
        expiry: '09/23',
        cvc: '505',
        balance: 5000,
      },
      {
        cardNumber: '5355280014933764',
        name: 'creative',
        expiry: '10/23',
        cvc: '506',
        balance: 0,
      },
    ], {});
  },

};
