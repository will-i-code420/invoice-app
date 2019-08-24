const {User} = require('../models');

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.status(201).json({
        status: true,
        user: user
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
      const isPasswordValid = password === user.password
      if (!user || !isPasswordValid) {
        return res.status(404).json({
          error: 'Incorrect login credentials'
        })
      }
      res.status(201).json({
        status: true,
        user: user
      })
    } catch (err) {
      res.status(500).json({
        error: 'Oops, our server had an issue, try again.'
      })
    }
  }
};
