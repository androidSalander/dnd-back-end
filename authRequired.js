let jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = (req, res, next) => {
  let bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(' ')
    let bearerToken = bearer[1]

    let verified = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
    req.userId = verified.id
    next()
  } else {
    return res.status(403).json({
      status: 403,
      message: 'permission required'
    })
  }
}
