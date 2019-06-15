const path = require('path');
const Umzug = require('umzug');

let umzug = new Umzug({
  logging: function() {
    console.log.apply(null, arguments);
  },
  migrations: {
    path: "./database/migrations",
    pattern: /\.js$/
  },
  upName: "up",
  downName: "down"
});
