const {Invoices} = require('../../models');
const {Transactions} = require('../../models');

module.exports = {
  async index (req, res) {
    try {
      const invoices = await Invoices.findAll({
        where: {
          invoiceId: req.company.id
        }
      })
      res.status(200).json({
        status: true,
        invoices: invoices
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  },
  async invoice (req,res) {
    try {
      let fullInvoice = await Invoices.findByPk(req.params.invoiceId, {
        include: [{
          model: Transactions,
          as: 'transactionId'
        }]
      })
      res.status(200).json({
        status: true,
        invoice: fullInvoice
      })
    } catch (err) {
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
        invoiceId: req.company.id,
        createdBy: req.user.id
      }).then((invoice) => {
        newInvoice = invoice
        const item_id = req.body.item_id.split(",")
        const description = req.body.description.split(",")
        const quantity = req.body.quantity.split(",")
        const price = req.body.price.split(",")
        for (let i = 0; i < item_id.length; i++) {
          Transactions.create({
            item_id: item_id[i],
            description: description[i],
            quantity: quantity[i],
            price: price[i],
            transactionId: newInvoice['id']
          })
        }
      })
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
  },
  async put (req, res) {
    try {
      await Invoices.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      const invoice = await Invoices.findByPk(req.params.id, {
        include: [{
          model: Transactions,
          as: 'transactionId'
        }]
      })
      res.status(200).json({
        status: true,
        message: "Payment Applied",
        invoice: invoice
      })
    } catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  }
};
