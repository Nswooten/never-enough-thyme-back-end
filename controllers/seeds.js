const { Seed } = require('../models')
// const cloudinary = require('cloudinary').v2


async function create(req, res){
  try{
    const seed = await Seed.create(req.body)    
    res.status(200).json(seed)
  } catch (error) {    
    console.log(error)
    
    res.status(500).json({ err: error })
  }
}




module.exports = { create, }
