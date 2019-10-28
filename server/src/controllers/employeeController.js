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
      employees.forEach(employee => delete employee.dataValues.password)
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
      delete employee.dataValues.password
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
    console.log(req.body)
    try {
      await User.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      await Employee.update(req.body.employeeId[0], {
        where: {
          employeeId: req.body.id
        }
      })
      await Tax.update(req.body.employeeId[0].taxId, {
        where: {
          taxId: req.body.employeeId[0].id
        }
      })
      const updatedEmployee = await User.findByPk(req.body.id, {
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
      delete updatedEmployee.dataValues.password
      res.status(200).json({
        status: true,
        employee: updatedEmployee,
        message: 'Employee Info Updated'
      })
    } catch (err) {
      console.log(err)
      res.status(409).json({
        status: false,
        error: `${err}`
      })
    }
  }
};
