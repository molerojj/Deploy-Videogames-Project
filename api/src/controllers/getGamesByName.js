
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre, Platform } = require('../db.js');


const videogamesApiByName = async (name) => {
    
    let gamesByName = [];
    
    const ApiGamesByName = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
    ApiGamesByName.data.results.map(g => {
            gamesByName.push({
                id: g.id,
                name: g.name,
                description: g.description_raw,
                release: g.released,
                rating: g.rating,
                genres: g.genres.map(g => g.name),
                platforms: g.platforms.map(p => p.platform.name),
                image: g.background_image
            })
    })

    return gamesByName
}

const videogamesDbByName = async (name) => {
    let games = await Videogame.findAll({
        where : {
            name : {[Op.iLike] : '%'+name+'%'}
        },
        include: [
            {
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            },
            {
                model: Platform,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }
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

const getAllGamesByName = async (name)=>{
    const apiVideogames = await videogamesApiByName(name)
    const dbVideogames = await videogamesDbByName(name)
    const allGames = dbVideogames.concat(apiVideogames)
    if (allGames.length === 0) throw Error(`The game ${name} does not exist`);
    return allGames;
}

module.exports = { getAllGamesByName, videogamesDbByName }