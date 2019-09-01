const {Invoices} = require('../models');
const {Transactions} = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const invoices = await Invoices.findAll({
        where: {
          invoiceId: req.params.id
        }
      })
      console.log(invoices)
      res.status(200).json({
        status: true,
        invoices: invoices
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  },
  async create (req, res) {
    let newInvoice = {}
    try {
      await Invoices.create({
        name: req.body.name,
        amount_paid: req.body.amount_paid,
        total_due: req.body.total_due,
        invoiceId: req.body.invoiceId
      }).then((invoice) => {
        newInvoice = invoice
         Transactions.create({
           item_id: req.body.item_id,
           description: req.body.description,
           quantity: req.body.quantity,
           price: req.body.price,
           transactionId: newInvoice['id']
         })
      })
      res.status(201).json({
        status: true,
        message: 'Invoice created'
      })
    } catch (err) {
      console.log(err)
      res.status(409).json({
        status: false,
        error: err
      })
    }
  }
};
