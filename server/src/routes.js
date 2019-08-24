module.exports = (app) => {
  app.post('/register', (req, res) => {
    return res.json({
      status: true,
      message: `${req.body.email} has been registered`
    })
  }),
  app.post('/login', (req, res) => {
    return res.json({
      status: true,
      message: `${req.body.email} has logged into system`
    })
  })
};
