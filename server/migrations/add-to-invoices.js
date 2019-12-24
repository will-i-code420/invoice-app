'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Invoices', 'due_date', {
        type: Sequelize.DATEONLY
      });
      await queryInterface.addColumn('Invoices', 'tax_amount', {
        type: Sequelize.INTEGER
      });
      await queryInterface.addColumn('Invoices', 'is_quote', {
        type: Sequelize.BOOLEAN
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Invoices', 'due_date');
      await queryInterface.removeColumn('Invoices', 'tax_amount');
      await queryInterface.removeColumn('Invoices', 'is_quote');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
