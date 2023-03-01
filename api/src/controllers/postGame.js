const { Videogame, Genre, Platform} = require('../db.js');
const { videogamesDbByName } = require('./getGamesByName.js');

const createNewGame = async (name, description, released, rating, platforms, genres, image) => {

    if(!name || !description || !platforms) throw Error('Missing data to complete');
    let findingGame = await videogamesDbByName(name);
    if(findingGame.length !== 0) throw Error('The game already exist');

    let createGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        image
    });

    genres.forEach(async gen => {
        const [genre] = await Genre.findOrCreate({ 
            where: { 
                name: gen,
            }});
        await createGame.addGenre(genre)
    });

    platforms.forEach(async plat => {
        const [platform] = await Platform.findOrCreate({ 
            where: { 
                name: plat,
            }});
        await createGame.addPlatform(platform)
    });

    return {...createGame.dataValues, ...{genres, platforms} }
}

module.exports = { createNewGame }