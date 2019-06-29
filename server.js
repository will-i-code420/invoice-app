const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const multipartMiddleware = multipart();
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3128;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('appSecret', 'secretforinvoiceapp');

app.get('/', function(req, res) {
  res.send("Welcome to the Invoice App");
});

app.get("/invoice/user/:user_id", multipartMiddleware, function(req, res) {
  let db = new sqlite3.Database("./database/InvoiceApp.db");
  let sql = `SELECT * FROM invoices LEFT JOIN transactions ON invoices.id=transactions.invoice_id WHERE user_id='${req.params.user_id}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json({
      status: true,
      invoices: rows
    });
  });
});

app.get("/invoice/user/:user_id/:invoice_id", multipartMiddleware, function(req, res) {
  let db = new sqlite3.Database("./database/InvoiceApp.db");
  let sql = `SELECT * FROM invoices LEFT JOIN transactions ON invoices.id=transactions.invoice_id WHERE user_id='${req.params.user_id}' AND invoice_id='${req.params.invoice_id}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    return res.json({
      status: true,
      transactions: rows
    });
  });
});

app.post('/register', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    let db = new sqlite3.Database("./database/InvoiceApp.db");
    let sql = `INSERT INTO users(name, email, company_name, password) VALUES ('${req.body.name}','${req.body.email}','${req.body.company_name}','${hash}')`;
    db.run(sql, function(err) {
      if (err) {
        throw err;
      } else {
        return res.json({
          status: true,
          message: "User Created"
        });
      }
    });
    db.close()
  });
});

app.post("/login", function(req, res) {
  let db = new sqlite3.Database("./database/InvoiceApp.db");
  let sql = `SELECT * from users where email='${req.body.email}'`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    db.close();
    if (rows.length === 0) {
      return res.json({
        status: false,
        message: "Sorry, wrong email"
      });
    }
    let user = rows[0];
    let authenticated = bcrypt.compareSync(req.body.password, user.password);
    delete user.password;
    if (authenticated) {
      return res.json({
        status: true,
        user: user
      });
    }
    return res.json({
      status: false,
      message: "Wrong Password, try again"
    });
  });
});

app.post("/invoice", multipartMiddleware, function(req, res) {
  let db = new sqlite3.Database("./database/InvoiceApp.db");
  let sql = `INSERT INTO invoices(name, user_id, paid) VALUES('${req.body.name}','${req.body.user_id}','${req.body.paid}')`;
  db.serialize(function() {
    db.run(sql, function(err) {
      if (err) {
        throw err;
      }
      let invoice_id = this.lastID;
      let query = `INSERT INTO transactions(description, quantity, price, total, invoice_id) VALUES('${req.body.description}','${req.body.quantity}','${req.body.price}',
      '${req.body.total}',${invoice_id})`;
      db.run(query);

      return res.json({
        status: true,
        message: "Invoice Created"
      });
    });
  });
});

app.listen(PORT, function() {
  console.log(`App running on localhost:${PORT}`);
});
