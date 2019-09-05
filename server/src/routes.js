const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const invoiceController = require('./controllers/invoiceController');
const businessController = require('./controllers/businessController');
const employeeController = require('./controllers/employeeController');

module.exports = (app) => {
  app.post('/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/login', authenticationController.login);
  app.post('/invoices', invoiceController.create);
  app.post ('/business', businessController.create);
  app.post ('/employee', employeeController.create);
  app.put('/invoices/:id', invoiceController.put);
  app.get('/invoices/:id', invoiceController.index);
  app.get('/invoices/:id/:invoiceId', invoiceController.invoice);
  app.get('/business/:id', businessController.index);
  app.get('/employee/:id', employeeController.index);
};
