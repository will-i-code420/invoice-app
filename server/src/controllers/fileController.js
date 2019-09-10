const {File} = require('../../models');

module.exports = {
  async upload (req, res) {
    const names = req.files.map(file => file.filename)
    const sizes = req.files.map(file => file.size)
    const types = req.files.map(file => file.mimetype)
    const paths = req.files.map(file => file.path)
    try {
      await File.create({
        name: names.join(','),
        size: sizes.join(','),
        type: types.join(','),
        path: paths.join(','),
        fileId: req.body.fileId
      })
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
