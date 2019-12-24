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
    tax_amount: DataTypes.INTEGER,
    total_due: DataTypes.INTEGER,
    due_date: DataTypes.DATEONLY,
    is_quote: DataTypes.BOOLEAN
  }, {});
  Invoices.associate = (models) => {
    Invoices.belongsTo(models.User, {
      foreignKey: 'createdBy'
    });
    Invoices.hasMany(models.Transactions, {
      foreignKey: 'invoiceId',
      as: 'invoiceId'
    });
  };
  return Invoices;
};
