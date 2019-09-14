'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      amount_paid: {
        type: Sequelize.INTEGER
      },
      total_due: {
        type: Sequelize.INTEGER
      },
      invoiceId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'invoiceId'
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
    return queryInterface.dropTable('Invoices');
  }
};
