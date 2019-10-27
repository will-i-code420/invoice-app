const {User} = require('../../models');
const {Employee} = require('../../models');
const {Tax} = require('../../models');

module.exports = {
  async index (req, res) {
    try {
      const employees = await User.findAll({
        where: {
          companyId: req.company.id
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
  async employee (req,res) {
    try {
      let employee = await User.findByPk(req.params.employeeId, {
        include: [
        {
          model: Employee,
          as: 'employeeId',
          include: [
            {
              model: Tax,
              as: 'taxId'
            }
          ]
        }
      ]
      })
      res.status(200).json({
        status: true,
        employee: employee
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
  },
  async put (req, res) {
    try {
      await Employee.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({
        status: true,
        message: 'Employee Info Updated'
      })
    } catch (err) {
      res.status(409).json({
        status: false,
        error: err
      })
    }
  }
};
