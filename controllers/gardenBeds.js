const { GardenBed, Seed, GardenBedSeed } = require('../models')

async function create(req, res){
  try{
    req.body.profileId = req.user.profile.id
    const gardenBed = await GardenBed.create(req.body)    
    res.status(200).json(gardenBed)
  } catch (error) {    
    res.status(500).json({ err: error })
  }
}

async function index(req, res) {
  try {
    const gardenBeds = await GardenBed.findAll({
      include: [
        { model: Seed, as: "seeds", through: { attributes: [] } }
      ]
    })
    res.json(gardenBeds)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const gardenBed = await GardenBed.findOne({
      where: {
        id: req.params.gardenBedId
      },
      include: [{ model: Seed, as: "seeds", through: { attributes: [] } }],
    })
    res.json(gardenBed)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function associateSeed(req, res) {
  try {
    const { gardenBedId, seedId } = req.params
    const association = await GardenBedSeed.create({
      gardenBedId: gardenBedId,
      seedId: seedId
    })
    res.status(200).json(association)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}


module.exports = {
  create,
  index,
  show,
  associateSeed
}