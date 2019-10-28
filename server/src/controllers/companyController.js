const {Company} = require('../../models');

module.exports = {
  async put (req, res) {
    try {
      await Company.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      const company = await Company.findByPk(req.params.id)
      res.status(200).json({
        status: true,
        company: company
      })
    } catch (err) {
      res.status(400).json({
        status: false,
        error: err
      })
    }
  }
};
