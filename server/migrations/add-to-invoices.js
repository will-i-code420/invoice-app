'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Invoices', 'subtotal_due', {
        type: Sequelize.INTEGER
      });
      await queryInterface.addColumn('Invoices', 'tax_rate', {
        type: Sequelize.INTEGER
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Invoices', 'subtotal_due');
      await queryInterface.removeColumn('Invoices', 'tax_rate');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
