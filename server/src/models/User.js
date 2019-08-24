module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_address: DataTypes.STRING,
    company_city: DataTypes.STRING,
    company_state: DataTypes.STRING,
    company_zip: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  })
  return User
};
