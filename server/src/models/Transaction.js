module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    item_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER
  })
  return Transaction
};
