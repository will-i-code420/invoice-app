const {Company} = require('../../models');
const {User} = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

function jwtSignUser (user) {
  return jwt.sign(user, config.development.authentication.jwtSecret, {
    expiresIn: "1hr"
  })
}

module.exports = {
  async register (req, res) {
    try {
      const company = await Company.create({
        company_name: req.body.company_name,
        company_phone: req.body.company_phone,
        company_address: req.body.company_address,
        company_city: req.body.company_city,
        company_state: req.body.company_state,
        company_zip: req.body.company_zip,
        company_ein: req.body.company_ein
      })
      const user = await User.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
        companyId: company.id
      })
      delete user.dataValues.password
      let userPayload ={user: user}
      let token = jwtSignUser(userPayload)
      res.status(201).json({
        status: true,
        company: company,
        user: user,
        token: 'Bearer ' + token
      })
    } catch (err) {
      console.log(err)
      res.status(409).json({
        error: `${req.body.email} or ${req.body.company_name} is already in use!`
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      const isPasswordValid = await user.comparePassword(password)
      delete user.dataValues.password
      if (!user || !isPasswordValid) {
        return res.status(404).json({
          error: 'Incorrect login credentials'
        })
      }
      const company = await Company.findOne({
        where: {
          id: user.companyId
        }
      })
      let selectedUser = user.dataValues
      let userPayload ={user: selectedUser}
      let token = jwtSignUser(userPayload)
      res.status(201).json({
        status: true,
        company: company,
        user: user,
        token: 'Bearer ' + token
      })
    } catch (err) {
      res.status(500).json({
        error: 'Oops, our server had an issue, try again.'
      })
    }
  }
};
