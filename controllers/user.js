const User = require('../models/User')

function profileRoute(req, res) {
  res.json(req.currentUser)
}

function updateRoute(req, res, next) {
  User.findOne({ email: req.currentUser.email })
    .then(user => {
      const { password, username, ...noPassword } = user
      return user.set({...noPassword, ...req.body})
    })
    .then(user => {
      delete user.password
      return user.save()
    })
    .then(user => res.json(user))
    .catch(next)
}

module.exports = {
  profile: profileRoute,
  update: updateRoute
}
