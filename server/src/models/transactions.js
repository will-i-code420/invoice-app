'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    item_id: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Transactions.belongsTo(models.Invoices, {
          foreignKey: 'InvoicesId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  Transactions.associate = function(models) {
    Transactions.belongsTo(models.Invoices)
  };
  return Transactions;
};
