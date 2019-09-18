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
      const user = await User.create(req.body)
      delete user.dataValues.password
      let selectedUser = user.dataValues
      let userPayload ={user: selectedUser}
      let token = jwtSignUser(userPayload)
      res.status(201).json({
        status: true,
        user: user,
        token: 'Bearer ' + token
      })
    } catch (err) {
      res.status(409).json({
        error: `${req.body.email} is already in use!`
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
      let selectedUser = user.dataValues
      let userPayload ={user: selectedUser}
      let token = jwtSignUser(userPayload)
      res.status(201).json({
        status: true,
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
