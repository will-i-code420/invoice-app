'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      business_name: {
        type: Sequelize.STRING
      },
      business_contact: {
        type: Sequelize.STRING
      },
      business_email: {
        type: Sequelize.STRING
      },
      business_phone: {
        type: Sequelize.STRING
      },
      business_address: {
        type: Sequelize.STRING
      },
      business_city: {
        type: Sequelize.STRING
      },
      business_state: {
        type: Sequelize.STRING
      },
      business_zip: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Businesses');
  }
};