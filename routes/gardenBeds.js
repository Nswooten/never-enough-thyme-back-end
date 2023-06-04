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
router.delete('/:gardenBedId', checkAuth, gardenBedsCtrl.deleteGardenBed)
router.put('/:gardenBedId', checkAuth, gardenBedsCtrl.updateGardenBed)
router.delete('/:gardenBedId/seeds/:seedId', checkAuth, gardenBedsCtrl.deleteSeedAssociation)



module.exports = router