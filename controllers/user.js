const User = require('../models/User')

function profileRoute(req, res) {
  res.json(req.currentUser)
}

function updateRoute(req, res, next) {
  User.findOne({ email: req.currentUser.email })
    .then(({ password, ...user }) => user)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next)
}

module.exports = {
  profile: profileRoute,
  update: updateRoute
}
