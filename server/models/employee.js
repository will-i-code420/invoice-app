'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    dob: DataTypes.STRING,
    ssn: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    Employee.belongsTo(models.User, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE'
    });
    Employee.hasOne(models.Tax, {
      foreignKey: 'taxId',
      as: 'taxId'
    });
    Employee.hasMany(models.File, {
      foreignKey: 'fileId',
      as: 'fileId'
    });
  };
  return Employee;
};
