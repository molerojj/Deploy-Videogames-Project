import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_VIDEOGAMES_BYNAME = "GET_VIDEOGAMES_BYNAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const CHANGE_LOADER = "CHANGE_LOADER";
export const CLEAN_ID = "CLEAN_ID";
export const DELETE_GAME = 'DELETE_GAME';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';

export const postVideogame = (payload) => {
    return async function(dispatch) {
        try {
            const result = await axios.post('http://localhost:3001/videogames', payload)
        dispatch({
            type: POST_VIDEOGAME,
            payload: result.data
        });
        alert('The videogame has succesfully created')
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const deleteGame = (id) => {
    return async function(dispatch) {
        if(id.includes('-')) {
            axios.delete(`http://localhost:3001/videogames/${id}`);
        }
        dispatch({
            type: DELETE_GAME,
            payload: id
        })
    }
}

export const getVideogames = () => {
    return async function(dispatch){
        const result = await axios.get('http://localhost:3001/videogames');
        const videogames = result.data;
        dispatch({
            type: GET_VIDEOGAMES,
            payload: videogames
        });
    };
};

export const getVideogameDetail = (idVideogame) => {
    return async function(dispatch){
        const result = await axios.get(`http://localhost:3001/videogames/${idVideogame}`);
        const videogame = result.data;
        dispatch({
            type: GET_VIDEOGAME_DETAIL,
            payload: videogame
        });
    };
};

export const getVideogameByName = (name) => {
    return async function (dispatch){
        try {
            const result = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            const videogame = result.data;
            dispatch({
                type: GET_VIDEOGAMES_BYNAME,
                payload: videogame
            });
        } catch (err) {
            alert("ERROR: " + err.response.data);
        }
    }; 
};

export const getGenres = () => {
    return async function(dispatch){
        const result = await axios.get(`http://localhost:3001/genres`);
        const genres = result.data;
        dispatch({
            type: GET_GENRES,
            payload: genres
        });
    };
};

export const getPlatforms = () => {
    return async function(dispatch){
        const result = await axios.get(`http://localhost:3001/platforms`);
        const platforms = result.data;
        dispatch({
            type: GET_PLATFORMS,
            payload: platforms
        });
    };
};

export const alphabeticalOrder = (payload) => {
    return {
        type: ALPHABETICAL_ORDER,
        payload,
    }
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload,
    }
}

export const filterByGenre = (payload) => {
    return {
        type: FILTER_GENRES,
        payload,
    }
}

export const filterBySource = (payload) => {
    return {
        type: FILTER_BY_SOURCE,
        payload,
    }
}

export const changeLoader = () => {
    return {
        type: CHANGE_LOADER,
        payload: true,
    };
};

export const cleanID = () => {
    return {
        type: CLEAN_ID,
        payload: true
    }
}

