const {Business} = require('../../models');

module.exports = {
  async index (req, res) {
    try {
      const business = await Business.findAll({
        where: {
          businessId: req.user.id
        }
      })
      res.status(200).json({
        status: true,
        business: business
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  },
  async business (req,res) {
    try {
      let business = await Business.findByPk(req.params.businessId)
      res.status(200).json({
        status: true,
        business: business
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  },
  async create (req, res) {
    try {
      await Business.create(req.body)
      res.status(201).json({
        status: true,
        message: 'Business added'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: err
      })
    }
  }
};
