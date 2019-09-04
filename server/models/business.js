'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    business_name: DataTypes.STRING,
    business_contact: DataTypes.STRING,
    business_email: DataTypes.STRING,
    business_phone: DataTypes.STRING,
    business_address: DataTypes.STRING,
    business_city: DataTypes.STRING,
    business_state: DataTypes.STRING,
    business_zip: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
  };
  return Business;
};