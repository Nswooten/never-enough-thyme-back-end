const router = require('express').Router()
const gardenBedsCtrl = require('../controllers/gardenBeds.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post("/", checkAuth, gardenBedsCtrl.create )
router.get("/", checkAuth, gardenBedsCtrl.index)
router.get("/:gardenBedId", checkAuth, gardenBedsCtrl.show)
router.post("/:gardenBedId/seeds/:seedId", gardenBedsCtrl.associateSeed)

module.exports = router