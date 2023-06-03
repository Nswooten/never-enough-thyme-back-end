const { GardenBed } = require('../models')

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
    const gardenBeds = await GardenBed.findAll()
    res.json(gardenBeds)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)
    res.json(gardenBed)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}



module.exports = {
  create,
  index,
  show
}