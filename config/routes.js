const router = require('express').Router()

const authController = require('../controllers/auth')
const userController = require('../controllers/user')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res) => res.json({ message: 'Welcome to Tweeter' }))

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/me', secureRoute, userController.profile)
router.put('/me', secureRoute, userController.update)

module.exports = router
