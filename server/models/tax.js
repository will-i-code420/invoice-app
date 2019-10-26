'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    marital_status: DataTypes.STRING,
    state_tax: DataTypes.INTEGER,
    fed_deductions: DataTypes.INTEGER
  }, {});
  Tax.associate = function(models) {
    Tax.belongsTo(models.Employee, {
      foreignKey: 'taxId'
    });
  };
  return Tax;
};
