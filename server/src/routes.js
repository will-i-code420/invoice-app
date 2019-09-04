const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const invoiceController = require('./controllers/invoiceController');

module.exports = (app) => {
  app.post('/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/login', authenticationController.login);
  app.post('/invoices', invoiceController.create);
  app.put('/invoices/:id', invoiceController.put)
  app.get('/invoices/:id', invoiceController.index);
  app.get('/invoices/:id/:invoiceId', invoiceController.invoice)
};
