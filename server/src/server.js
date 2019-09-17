const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('../models');
const config = require('../config/config.json');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./passport')

require('./routes')(app);

sequelize.sync().then(() => {
  app.listen(config.development.port)
  console.log(`Server running on Port: ${config.development.port}`)
});
