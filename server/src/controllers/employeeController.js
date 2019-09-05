const {Employee} = require('../../models');

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
  },
  async create (req, res) {
    try {
      await Employee.create(req.body)
      res.status(201).json({
        status: true,
        message: 'Employee added'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: err
      })
    }
  }
};
