const {Invoice} = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const user = req.params.user_id
      const invoices = await Invoice.findAll({
        where: {
          user_id: user
        }
      })
      res.status(200).json({
        status: true,
        invoices: invoices
      })
    } catch (err) {
      res.status().json({
        error: err
      })
    }
  },
  async create (req, res) {
    try {
      const invoice = Invoice.create(req.body)
      res.status(201).json({
        status: true,
        message: 'Invoice created'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: err
      })
    }
  }
};
