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

async function deleteGardenBed(req, res) {
  try {
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)    
    if(req.user.profile.id === gardenBed.profileId){
      const rowsRemoved = await GardenBed.destroy(
        { where: { id: req.params.gardenBedId} }
      )
      res.json({rowsRemoved: rowsRemoved, deletedRow: gardenBed})
    }else{
      res.status(403).json({err: "Not Today Cowboy"})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateGardenBed(req, res) {
  try {
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)
    if(req.user.profile.id === gardenBed.profileId){
      gardenBed.set(req.body)
      await gardenBed.save()
      res.json(gardenBed)
    }else{
    res.status(403).json({err: "Not Today Cowboy"})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteSeedAssociation(req, res) {
  try {
    const { gardenBedId, seedId } = req.params
    const association = await GardenBedSeed.findOne({
      where: { 
        gardenBedId: gardenBedId,
        seedId: seedId
      }
    })
    const rowsRemoved = await GardenBedSeed.destroy({
      where: { 
        gardenBedId: gardenBedId,
        seedId: seedId
      }
    })
    res.status(200).json({rowsRemoved: rowsRemoved, destroyedAssociation: association})
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}


module.exports = { create, index, show, associateSeed, deleteGardenBed, updateGardenBed, deleteSeedAssociation }