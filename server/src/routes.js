const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const invoiceController = require('./controllers/invoiceController');
const transactionsController = require('./controllers/transactionsController');

module.exports = (app) => {
  app.post('/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/login', authenticationController.login);
  app.post('/invoices/:invoiceId', invoiceController.create)
  app.post('/invoices/:transactionId', transactionsController.create)
};
