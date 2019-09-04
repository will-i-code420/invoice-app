'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    state_tax: DataTypes.INTEGER,
    fed_tax: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};