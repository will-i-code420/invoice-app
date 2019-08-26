module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    name: DataTypes.STRING,
    item_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    paid: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  })
  return Invoice
};
