const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db')
require("dotenv").config();
const { API_KEY } = process.env;





const getApiVideoGames = async () => {
    let apiVideogames = [];
    for (let i = 1; i <= 5; i++){
        let games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        apiVideogames = apiVideogames.concat(games.data.results);
    }
    const videogames = apiVideogames.map(g => {
        return {
            id: g.id,
            name: g.name,
            description: g.description_raw,
            released: g.released,
            rating: g.rating,
            genres: g.genres.map((gen) => gen.name),
            platforms: g.platforms.map(plat => plat.platform.name),
            image: g.background_image
        }
    })
    return videogames;

}

const getDbVideoGames = async () => {
    const games = await Videogame.findAll({
        include: [
            {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
            {
                model: Platform,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
        ]
    })
    return games.map(game => {
        return {
            ...game.dataValues,
            genres: game.genres.map(g => g.name),
            platforms: game.platforms.map(p => p.name),
        };
    });
}

const getAllVideoGames = async () => {
    const apiGames = await getApiVideoGames();
    const dbGames = await getDbVideoGames();
    const allGames = dbGames.concat(apiGames);
    return allGames;
}

module.exports = { getAllVideoGames, getApiVideoGames }