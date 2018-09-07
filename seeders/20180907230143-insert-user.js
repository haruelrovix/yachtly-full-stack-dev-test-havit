'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'john@mail.com',
      phoneNumber: '+6582992678',
      address: 'ONE°15 Marina Sentosa Cove, Singapore'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
