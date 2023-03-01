const { Genre } = require('../db');
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require('axios');




const getAllGenres = async () => {

    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    let data = genresApi.data.results;

    let allGenres = [];
    data.map(gen => {
        if(!allGenres.find(genero => genero === gen.name)){
            allGenres.push(gen.name)
        }
    })

    allGenres.forEach(g => {
        Genre.findOrCreate({
            where: { name: g }
        })
    })
    
    return await Genre.findAll();
}

module.exports = { getAllGenres }