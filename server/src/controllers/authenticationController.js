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
  login (req, res) {
    return res.json({
      status: true,
      message: `${req.body.email} has been registered`
    })
  }
};
