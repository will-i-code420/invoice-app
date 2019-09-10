const multer = require('multer');
const moment = require('moment');
const path = require('path');
const date = moment().format('lll');

exports.addFile = function(req, res, next) {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../../employeeFiles'));
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + date + path.extname(file.originalname));
    }
  })
  const upload = multer({storage: storage}).array('files', 10)
  try {
    upload(req, res, (err) => {
      if (err) {
        console.log(err)
      } else {
        next()
      }
    })
  } catch (err) {
    console.log(err)
  }
}
