const { Profile } = require('../models')
const { GardenBed } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const profiles = await Profile.findAll()
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)
    
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url

    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findOne({
      where: {
        id: req.params.profileId
      },
      include: [{ model: GardenBed }],
    })
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}


async function deleteGardenBed(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.profileId)
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)    
    if(profile.id === gardenBed.profileId){
      const rowsRemoved = await GardenBed.destroy(
        { where: { id: req.params.gardenBedId} }
      )
      res.json({rowsRemoved, gardenBed})
    }else{
      res.status(403)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateGardenBed(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.profileId)
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)    
    if(profile.id === gardenBed.profileId){
      gardenBed.name = req.body.name
      gardenBed.height = req.body.height
      gardenBed.width = req.body.width
      await gardenBed.save()
      const updatedGardenBed = await GardenBed.findByPk(req.params.gardenBedId) 
      res.json({updatedGardenBed})
    }else{
      res.status(403)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}



module.exports = { index, addPhoto, show, deleteGardenBed, updateGardenBed }
