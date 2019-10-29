const {Business} = require('../../models');

module.exports = {
  async index (req, res) {
    try {
      const business = await Business.findAll({
        where: {
          businessId: req.company.id
        }
      })
      res.status(200).json({
        status: true,
        business: business
      })
    } catch (err) {
      res.status(500).json({
        error: `${err}`
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
        error: `${err}`
      })
    }
  },
  async create (req, res) {
    try {
      await Business.create({
        business_name: req.body.business_name,
        business_contact: req.body.business_contact,
        business_email: req.body.business_email,
        business_phone: req.body.business_phone,
        business_address: req.body.business_address,
        business_city: req.body.business_city,
        business_state: req.body.business_state,
        business_zip: req.body.business_zip,
        businessId: req.company.id
      })
      res.status(201).json({
        status: true,
        message: 'Business added'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: `${err}`
      })
    }
  },
  async put (req, res) {
    try {
      await Business.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        status: true,
        message: 'Business Info Updated'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: `${err}`
      })
    }
  },
  async destroy (req, res) {
    try {
      await Business.destroy({
        where: {
          id: req.params.businessId
        }
      })
      res.status(200).json({
        status: true,
        message: 'Business deleted'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: `${err}`
      })
    }
  }
};
