'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    state_tax: DataTypes.INTEGER,
    fed_tax: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    Employee.belongsTo(models.User, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.File, {
      foreignKey: 'fileId',
      as: 'transactionId'
    });
  };
  return Employee;
};
