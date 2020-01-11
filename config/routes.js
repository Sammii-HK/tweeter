const router = require('express').Router()

const authController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res) => res.json({ message: 'Welcome to Tweeter' }))

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/me', secureRoute, authController.profile)
router.put('/me', secureRoute, authController.update)

module.exports = router
