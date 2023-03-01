import { POST_VIDEOGAME, CLEAN_ID, CHANGE_LOADER, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAMES_BYNAME, GET_GENRES, GET_PLATFORMS, FILTER_GENRES, ORDER_BY_RATING, ALPHABETICAL_ORDER, FILTER_BY_SOURCE, DELETE_GAME } from "./actions";

const initialState = {
    videogames: [],
    videogamesCopy: [],
    genres: [],
    platforms: [],
    videogameDetail: {},
    lastFilter: '',
    lastFilterValue: '',
    isLoader: false
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){

        case POST_VIDEOGAME:
            let newVideogame = [ ...state.videogames ]
            newVideogame.unshift(action.payload)
            return {
                ...state,
                videogames: newVideogame,
                videogamesCopy: newVideogame
            }

        case GET_VIDEOGAMES:
            return {
                ...state, 
                videogames: action.payload,
                videogamesCopy: action.payload,
                isLoader : false,
                lastFilter: '',
                lastFilterValue: '',
            };
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload,
            };
        case GET_VIDEOGAMES_BYNAME:
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            };
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            };
        case ORDER_BY_RATING:
            let sortRating = [ ...state.videogames ]
            if(action.payload === "0-5"){
                sortRating.sort((a,b) => {
                    if(a.rating > b.rating) return 1;
                    if(a.rating < b.rating) return -1;
                    return 0
                });
            } else {
                sortRating.sort((a,b) => {
                    if(a.rating < b.rating) return 1;
                    if(a.rating > b.rating) return -1;
                    return 0
                });
            } return {
                ...state,
                videogames: sortRating,
            }
        case ALPHABETICAL_ORDER:
            let sortAlphabetical = [ ...state.videogames ]
            if(action.payload === "a-z"){
                sortAlphabetical.sort((a,b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0
                });
            } else {
                sortAlphabetical.sort((a,b) => {
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;
                    return 0
                });
            } return {
                ...state,
                videogames: sortAlphabetical,
        };
        case FILTER_BY_SOURCE:
            let allVideogames = state.videogamesCopy;
            const lastFilter = state.lastFilter;
            if(lastFilter === 'genres'){ 
                allVideogames = allVideogames.filter(g => g.genres.includes(state.lastFilterValue));
            }
            const result = action.payload === "db"
            ? allVideogames.filter(g => g.createdInDb)
            : allVideogames.filter(g => !g.createdInDb);
            return {
                ...state,
                videogames: action.payload === "all" ? allVideogames : result,
                lastFilter: 'source',
                lastFilterValue: action.payload
            }
        case FILTER_GENRES:
            let genres = state.videogamesCopy;
            const filter = state.lastFilter;
            if (filter === 'source'){
                // genres = state.lastFilterValue === "db"
                // ? genres.filter(g => g.createdInDb)
                // : genres.filter(g => !g.createdInDb);
                if(state.lastFilterValue === "db"){
                    genres.filter(g => g.createdInDb)
                } else if (state.lastFilterValue === "api") {
                    genres.filter(g => !g.createdInDb);
                } else {
                    genres = state.videogamesCopy;
                }
                
            }
            const filtered = genres.filter(g => g.genres.includes(action.payload));
            return {
                ...state,
                videogames: filtered,
                lastFilter: 'genres',
                lastFilterValue: action.payload
            };
        case CHANGE_LOADER:
            return {
                ...state,
                isLoader : true
            }
        case CLEAN_ID:
            return {
                ...state,
                videogameDetail: []
            }
        case DELETE_GAME:
            let allGames = [ ...state.videogames ];
            // console.log(allGames);
            // let elJuego = allGames.filter(g => g.id === action.payload);
            // console.log(elJuego, 'el juego a borrar');
            let videogameDeleted = allGames.filter(g => g.id !== action.payload);
            return {
                ...state,
                videogames: videogameDeleted,
                videogamesCopy: videogameDeleted
            }
        default:
            return { 
                ...state 
            };
    }
}

export default rootReducer;