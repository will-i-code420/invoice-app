'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define('Invoices', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    amount_paid: DataTypes.INTEGER,
    total_due: DataTypes.INTEGER
  }, {});
  Invoices.associate = (models) => {
    Invoices.belongsTo(models.User, {
      foreignKey: 'invoiceId',
      onDelete: 'CASCADE'
    });
    Invoices.hasMany(models.Transactions, {
      foreignKey: 'transactionId',
      as: 'transactionId'
    });
  };
  return Invoices;
};
