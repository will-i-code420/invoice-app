const authenticationController = require('./controllers/authenticationController');
const authenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const invoiceController = require('./controllers/invoiceController');
const businessController = require('./controllers/businessController');
const employeeController = require('./controllers/employeeController');
const fileController = require('./controllers/fileController');
const uploadController = require('./controllers/uploadController');
const logoController = require('./controllers/logoController');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
  app.post('/register', authenticationControllerPolicy.register, authenticationController.register);
  app.post('/login', authenticationController.login);
  app.post('/invoices', isAuthenticated, invoiceController.create);
  app.post('/business', isAuthenticated, businessController.create);
  app.post('/employee', isAuthenticated, employeeController.create);
  app.post('/employeeFiles', isAuthenticated, uploadController.addFile, fileController.upload);
  app.post('/businessLogo', isAuthenticated, logoController.addLogo, fileController.logo);
  app.put('/invoices/:id', isAuthenticated, invoiceController.put);
  app.get('/invoices', isAuthenticated, invoiceController.index);
  app.get('/invoices/:id/:invoiceId', isAuthenticated, invoiceController.invoice);
  app.get('/business', isAuthenticated, businessController.index);
  app.get('/employee/:id', isAuthenticated, employeeController.index);
  app.get('/employee/:id/:employeeId', isAuthenticated, employeeController.employee);
  app.get('/business/:businessId', isAuthenticated, businessController.business);
};
