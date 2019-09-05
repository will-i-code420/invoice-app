const {Business} = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const business = await Business.findAll({
        where: {
          businessId: req.params.id
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
  }
};
