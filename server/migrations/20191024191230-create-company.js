'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      company_name: {
        type: Sequelize.STRING
      },
      company_phone: {
        type: Sequelize.STRING
      },
      company_address: {
        type: Sequelize.STRING
      },
      company_city: {
        type: Sequelize.STRING
      },
      company_state: {
        type: Sequelize.STRING
      },
      company_zip: {
        type: Sequelize.INTEGER
      },
      company_ein: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies');
  }
};
