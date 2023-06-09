const { GardenBed, Seed, GardenBedSeed } = require('../models')

async function create(req, res) {
  try {
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
      include: [{
        model: Seed,
        as: "seeds",
        through: {
          attributes: ['qty']
        }
      }]
    })
    const modifiedGardenBed = {
      ...gardenBed.toJSON(),
      seeds: []
    }
    gardenBed.seeds.forEach((seed) => {
      const qty = seed.GardenBedSeed.qty
      const modifiedSeed = { ...seed.toJSON() }
      delete modifiedSeed.GardenBedSeed
      for (let i = 0; i < qty; i++) {
        modifiedGardenBed.seeds.push(modifiedSeed)
      }
    })
    res.json(modifiedGardenBed)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}


async function associateSeed(req, res) {
  try {
    const { gardenBedId, seedId } = req.params
    const seedToBeAdded = await Seed.findByPk(req.params.seedId)
    const currentAssociation = await GardenBedSeed.findOne({
      where: {
        gardenBedId: gardenBedId,
        seedId: seedId
      }
    })
    if (currentAssociation) {
      currentAssociation.qty = currentAssociation.qty + 1
      await currentAssociation.save()
      res.status(200).json({ currentAssociation, seed: seedToBeAdded })
    } else {
      const association = await GardenBedSeed.create({
        gardenBedId: gardenBedId,
        seedId: seedId,
        qty: 1
      })
      res.status(200).json({ association, seed: seedToBeAdded })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteGardenBed(req, res) {
  try {
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)
    if (req.user.profile.id === gardenBed.profileId) {
      const rowsRemoved = await GardenBed.destroy(
        { where: { id: req.params.gardenBedId } }
      )
      res.json({ rowsRemoved: rowsRemoved, deletedRow: gardenBed })
    } else {
      res.status(403).json({ err: "Not Today Cowboy" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateGardenBed(req, res) {
  try {
    const gardenBed = await GardenBed.findByPk(req.params.gardenBedId)
    if (req.user.profile.id === gardenBed.profileId) {
      gardenBed.set(req.body)
      await gardenBed.save()
      res.json(gardenBed)
    } else {
      res.status(403).json({ err: "Not Today Cowboy" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteSeedAssociation(req, res) {
  try {
    const { gardenBedId, seedId } = req.params
    const seedToBeDeleted = await Seed.findByPk(req.params.seedId)
    const association = await GardenBedSeed.findOne({
      where: {
        gardenBedId: gardenBedId,
        seedId: seedId
      }
    })
    association.qty = association.qty - 1
    await association.save()
    if (association.qty === 0) {
      const rowsRemoved = await GardenBedSeed.destroy({
        where: {
          gardenBedId: gardenBedId,
          seedId: seedId
        }
      })
      res.status(200).json({ rowsRemoved: rowsRemoved, destroyedAssociation: association, seed: seedToBeDeleted })
    } else {
      res.status(200).json({ association, seed: seedToBeDeleted })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { create, index, show, associateSeed, deleteGardenBed, updateGardenBed, deleteSeedAssociation }