module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    name: DataTypes.STRING,
    amount_paid: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  })
  return Invoice
};
