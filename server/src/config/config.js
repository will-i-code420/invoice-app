module.exports = {
  port: process.env.PORT || 3128,
  db: {
    database: process.env.DB_NAME || 'invoice',
    user: process.env.USER || 'invoice',
    password: process.env.PASS || 'invoice',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './invoice.sqlite'
    }
  }
};
