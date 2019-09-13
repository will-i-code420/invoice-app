const {File} = require('../../models');

module.exports = {
  async upload (req, res) {
    const name = req.files.map(file => file.originalname.split(","));
    const size = req.files.map(file => file.size.toString().split(","));
    const type = req.files.map(file => file.mimetype.split(","));
    const path = req.files.map(file => file.path.split(","));
    const names = [].concat(...name);
    const sizes = [].concat(...size);
    const types = [].concat(...type);
    const paths = [].concat(...path);
    try {
      for (let i = 0; i < name.length; i++) {
        await File.create({
          name: names[i],
          size: sizes[i],
          type: types[i],
          path: paths[i],
          fileId: req.body.fileId
        })
      }
      res.status(200).json({
        status: true,
        message: "File(s) Uploaded"
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
};
