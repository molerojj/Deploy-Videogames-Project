const { Router } = require("express");
const { getAllVideoGames } = require('../controllers/getGames')
const { getAllGamesByName } = require('../controllers/getGamesByName')
const { createNewGame } = require('../controllers/postGame')
const { videogameById } = require('../controllers/getGameById')
const { deleteGame } = require('../controllers/deleteGame')


const videogamesRouter = Router();

videogamesRouter.get("/", async (req, res) => {
    const { name } = req.query
    try {
        let result = name 
        ? await getAllGamesByName(name) 
        : await getAllVideoGames();
        res.status(200).json(result)
    } catch (error) {
        res.status(404).send(error.message);
    }
});

videogamesRouter.get("/:idVideogame", async (req, res) => {
    const { idVideogame } = req.params;
    try {
        const gamesById = await videogameById(idVideogame)
        res.status(200).json(gamesById)
    } catch (error) {
        res.status(404).send(`The game ID: ${idVideogame} does not exist`)
    }
});

videogamesRouter.post('/', async (req, res) => {
    const { name, description, released, rating, platforms, genres, image } = req.body;
    try {
        const newGame = await createNewGame(name, description, released, rating, platforms, genres, image)
        res.status(201).send(newGame)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

videogamesRouter.delete('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    try {
        await deleteGame(idVideogame);
        res.status(200).send(`The game with ID: ${idVideogame} was successfully deleted`);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = videogamesRouter;