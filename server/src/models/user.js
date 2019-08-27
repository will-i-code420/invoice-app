'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }
  return bcrypt.hash(user.password, 10, null)
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_address: DataTypes.STRING,
    company_city: DataTypes.STRING,
    company_state: DataTypes.STRING,
    company_zip: DataTypes.INTEGER,
    admin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Invoices, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        })
      }
    },
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  //User.associate = function(models) {
    // associations can be defined here
  //};
  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  };
  return User;
};
