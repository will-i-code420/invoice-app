const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const invoiceController = require('./controllers/invoiceController');
const businessController = require('./controllers/businessController');
const employeeController = require('./controllers/employeeController');
const fileController = require('./controllers/fileController');
const uploadController = require('./controllers/uploadController');

module.exports = (app) => {
  app.post('/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/login', authenticationController.login);
  app.post('/invoices', invoiceController.create);
  app.post('/business', businessController.create);
  app.post('/employee', employeeController.create);
  app.post('/employeeFiles', uploadController.addFile, fileController.upload);
  app.put('/invoices/:id', invoiceController.put);
  app.get('/invoices/:id', invoiceController.index);
  app.get('/invoices/:id/:invoiceId', invoiceController.invoice);
  app.get('/business/:id', businessController.index);
  app.get('/employee/:id', employeeController.index);
  app.get('/employee/:id/:employeeId', employeeController.employee);
  app.get('/business/:id/:businessId', businessController.business);
};
