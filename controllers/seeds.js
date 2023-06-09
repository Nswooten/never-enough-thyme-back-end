const { Seed } = require('../models')


async function create(req, res) {
  try {
    const seed = await Seed.create(req.body)
    res.status(200).json(seed)
  } catch (error) {
    console.log(error)

    res.status(500).json({ err: error })
  }
}

async function index(req, res) {
  try {
    const seeds = await Seed.findAll()
    res.status(200).json(seeds)
  } catch (error) {
    console.log(error)

    res.status(500).json({ err: error })
  }
}

async function show(req, res) {
  try {
    const seed = await Seed.findByPk(req.params.seedId)
    res.status(200).json(seed)
  } catch (error) {
    console.log(error)

    res.status(500).json({ err: error })
  }
}




module.exports = { create, index, show }
