const router = require('express').Router()
const seedsCtrl = require('../controllers/seeds.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/", checkAuth, seedsCtrl.create )

module.exports = router