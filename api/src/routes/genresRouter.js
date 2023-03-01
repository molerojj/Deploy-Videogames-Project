const { Router } = require('express')
const { getAllGenres } = require('../controllers/getGenres')

const genresRouter = Router();

genresRouter.get('/', async (req, res) => {
    try {
        const genres = await getAllGenres();
        res.status(200).json(genres)
    } catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = genresRouter;