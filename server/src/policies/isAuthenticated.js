const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('jwt', {session: false}, function (err, {user,company}) {
    if (err || !user || !company) {
      res.status(401).json({
        status: false,
        error: 'You do not have access to this resource'
      })
    } else {
      req.user = user
      req.company = company
      next()
    }
  }) (req, res, next)
};
