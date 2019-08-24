module.exports = {
  register (req, res) {
    return res.json({
      status: true,
      message: `${req.body.email} has been registered`
    })
  },
  login (req, res) {
    return res.json({
      status: true,
      message: `${req.body.email} has been registered`
    })
  }
};
