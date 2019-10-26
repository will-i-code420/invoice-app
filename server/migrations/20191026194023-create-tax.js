'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Taxes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      marital_status: {
        type: Sequelize.STRING
      },
      fica: {
        type: Sequelize.INTEGER
      },
      medicare: {
        type: Sequelize.INTEGER
      },
      state_tax: {
        type: Sequelize.INTEGER
      },
      fed_deductions: {
        type: Sequelize.INTEGER
      },
      taxId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        onDelete: 'CASCADE',
        references: {
          model: 'Employee',
          key: 'id',
          as: 'taxId'
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
    return queryInterface.dropTable('Taxes');
  }
};
