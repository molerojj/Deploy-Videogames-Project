const { Router } = require('express')
const { getAllPlatforms } = require('../controllers/getPlatforms')

const platformsRouter = Router();

platformsRouter.get('/', async (req, res) => {
    try {
        const platforms = await getAllPlatforms();
        res.status(200).json(platforms)
    } catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = platformsRouter;