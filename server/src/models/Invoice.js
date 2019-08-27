module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    amount_paid: DataTypes.INTEGER,
    total_due: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Invoice.hasMany(models.Transaction, {
          foreignKey: 'InvoiceId',
          onDelete: 'CASCADE'
        })
        Invoice.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        })
      }
    }
  })
  return Invoice
};
