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
    size: DataTypes.INTEGER,
    type: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.Employee, {
      foreignKey: 'fileId',
      onDelete: 'CASCADE'
    });
  };
  return File;
};
