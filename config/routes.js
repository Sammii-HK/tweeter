const router = require('express').Router()

const authenticationController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res) => res.json({ message: 'Welcome to Tweeter' }))

router.post('/register', authenticationController.register)
router.post('/login', authenticationController.login)
router.get('/me', secureRoute, authenticationController.profile)

module.exports = router
