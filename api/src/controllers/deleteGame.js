const { dbVideoGameById } = require ("./getGameById");
const { Videogame } = require('../db.js');



const deleteGame = async (idVideogame) => {
    const result = await dbVideoGameById(idVideogame);
    if(!result) throw Error(`The game ID: ${idVideogame} does not exist`);
    Videogame.destroy({
        where: {
            id: idVideogame
        }
    })
}

module.exports = { deleteGame }