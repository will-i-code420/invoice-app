const passport = require('passport');
const {Company} = require('../models');
const {User} = require('../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config.json');

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.development.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.user.id
        }
      })
      const company = await Company.findOne({
        where: {
          id: jwtPayload.company.id
        }
      })
      if (!user || !company) {
        return done(new Error(), false)
      }
      return done(null, {user, company})
    } catch (err) {
      return done(new Error(), false)
    }
  })
);

module.exports = null
