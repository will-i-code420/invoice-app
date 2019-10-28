'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
      businessId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        onDelete: 'CASCADE',
        references: {
          model: 'Company',
          key: 'id',
          as: 'businessId'
        }
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
