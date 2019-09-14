'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logo = sequelize.define('Logo', {
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
  Logo.associate = function(models) {
    Logo.belongsTo(models.User, {
      foreignKey: 'imageId',
      onDelete: 'CASCADE'
    });
  };
  return Logo;
};
