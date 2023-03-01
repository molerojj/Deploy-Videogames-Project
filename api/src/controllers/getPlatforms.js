const { Platform } = require('../db');
const { getApiVideoGames } = require('./getGames');






const getAllPlatforms = async () => {

    const videogamesApi = await getApiVideoGames();

    let platforms = videogamesApi.map(g =>
        g.platforms
    );
    
    let allPlatforms = [];
        platforms.forEach(plat => {
            plat.forEach(p => {
                if (!allPlatforms.find(plat => plat === p)) {
                    allPlatforms.push(p);
            }
        });
    });
    
    allPlatforms.forEach(p => {
        Platform.findOrCreate({
            where: { name: p },
        });
    });
    
    return await Platform.findAll();
}

module.exports = { getAllPlatforms }