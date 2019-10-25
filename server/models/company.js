'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    company_name: {
      type: DataTypes.STRING,
      unique: true
    },
    company_phone: DataTypes.STRING,
    company_address: DataTypes.STRING,
    company_city: DataTypes.STRING,
    company_state: DataTypes.STRING,
    company_zip: DataTypes.INTEGER,
    company_ein: DataTypes.INTEGER
  }, {});
  Company.associate = function(models) {
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      as: 'companyId'
    });
  };
  return Company;
};
