const {Employee} = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const employees = await Employee.findAll({
        where: {
          employeeId: req.params.id
        }
      })
      res.status(200).json({
        status: true,
        employee: employees
      })
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  }
};
