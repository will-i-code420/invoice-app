const Joi = require('joi');

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/),
      company_name: Joi.string(),
      company_address: Joi.string(),
      company_city: Joi.string(),
      company_state: Joi.string(),
      company_zip: Joi.string(),
      admin: Joi.boolean()
    }
    const {error, value} = Joi.validate(req.body, schema)
    if (error) {
      switch(error.details[0].context.key) {
        case 'email': res.status(409).json({
          error: 'Please provide valid email address'
        })
        break;
        case 'password': res.status(409).json({
          error: `Provided password failed to match 1 or both rules:
          <br>
          1. Must contain the following characters: lowercase, uppercase, or numbers. No spaces or special characters
          <br>
          2. Must be between 8 and 32 characters in length`
        })
        break;
        default: res.status(409).json({
          error: 'Invalid registration info, try again'
        })
      }
    } else {
      next()
    }
  }
};
