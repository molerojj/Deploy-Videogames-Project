require("dotenv").config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db.js');


const apiVideoGameById = async (idVideogame) => {
    let apiData = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);

    let genres = apiData.data.genres.map(g => g.name).join(', ');
    let platforms = apiData.data.platforms.map(g => g.platform.name).join(', ');

    let videogameDetails = {
            id: apiData.data.id,
            name: apiData.data.name,
            description: apiData.data.description_raw,
            released: apiData.data.released,
            rating: apiData.data.rating,
            genres: genres,
            platforms: platforms,
            image: apiData.data.background_image
        };
        return videogameDetails
};

const dbVideoGameById = async (idVideogame) => {
    return await Videogame.findByPk(idVideogame, {
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
};

const videogameById = async (idVideogame) => {
    let results = (idVideogame.includes('-'))
    ? await dbVideoGameById(idVideogame)
    : await apiVideoGameById(idVideogame);
    return results;
}

module.exports = { videogameById, dbVideoGameById }