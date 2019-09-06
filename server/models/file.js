'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE'
    });
  };
  return File;
};
