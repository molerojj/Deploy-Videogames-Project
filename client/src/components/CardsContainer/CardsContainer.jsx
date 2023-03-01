import Card from "../Card/Card"
import style from './CardsContainer.module.css'
import { useSelector } from "react-redux";
import { Loader } from '../Loader/Loader'

const CardsContainer = ({page}) => {

    const allVideogames = useSelector((state) => state.videogames); 
    const paginatedVideogames = paginate(allVideogames, page);

    const loading = useSelector((state) => state.isLoader);


    if(!loading) {
        if (paginatedVideogames.length > 0) {
            return (
                <div className = {style.mainContainer}>
                    {paginatedVideogames.map(game => {
                        return <Card 
                            key = {game.name}
                            idVideogame = {game.id}
                            name = {game.name}
                            genres = {game.genres}
                            platforms = {game.platforms}
                            rating = {game.rating}
                            image = {game.image}
                        />
                    })}
                </div>
            )
        } else {
            return (
            <div className={style.container}>
                <h4>
                    Sorry, No options available! ☹️
                </h4>
            </div>
            );
        }
    } else {
        return (
            <Loader />
        );
    }
}

const paginate = (totalElements, page) => {
    let start = (page - 1) * 15;
    let end = start + 15;
    return totalElements.slice(start, end);
};

export default CardsContainer;