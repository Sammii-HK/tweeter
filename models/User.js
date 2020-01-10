const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const _ = require('lodash')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please provide a username',
    unique: 'That username is already registered'
  },
  email: {
    type: String,
    required: 'Please provide and email address',
    unique: 'That email is already registered'
  },
  password: {
    type: String,
    required: 'Please provide a password',
    minlength: [6, 'The password should be longer than 6 characters'],
    maxlength: [12, 'The password should be less than 12 characters']
  },
  location: {
    type: String,
    required: [function() {
      if this.isUser
    }, 'Please enter your location']
  },
  date_of_joining: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    virtuals: true, // add virtuals to the JSON
    transform(doc, json) {
      delete json.password // delete the password
      delete json.__v
      return json
    }
  },
  toObject: { virtuals: true }
})

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext) {
    this._passwordConfirmation = plaintext
  })

// LIFECYCLE HOOKS
userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('save', function hashPassword(next) {
  // only hash the password if it has been modified
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }

  next()
})

userSchema.methods.isPasswordValid = function isPasswordValid(plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema, 'users')
