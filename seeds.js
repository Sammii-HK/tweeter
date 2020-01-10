const mongoose = require('mongoose')
const User = require('./models/User')
const { dbUri } = require('./config/environment')

mongoose.connect(dbUri, (err, db) => {

  db.dropDatabase()
  return User.create({
    username: 'Mx User',
    email: 'email@email.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  })
    .then(user => {
        mongoose.connection.close()
    })
    .catch(err => {
          console.log(err)
          mongoose.connection.close()
        })
})
