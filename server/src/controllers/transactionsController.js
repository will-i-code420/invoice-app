const {Transactions} = require('../models');

module.exports = {
  create (req, res) {
    try {
      Transactions.create({
        item_id: req.body.item_id,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        transactionId: req.params.transactionId
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: err
      })
    }
  }
};
