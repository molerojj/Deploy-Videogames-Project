import style from './Card.module.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const Card = (props) => {
    return (
        <div className={style.mainCard}>
            <div className={style.rating}>
                <FontAwesomeIcon className={style.icon} icon={faStar} />
                <p className={style.prat}>{props.rating}</p>
            </div>
            <NavLink className={style.link} to={`/videogames/${props.idVideogame}`}>
                <img className={style.image} src={props.image} alt={props.name} />
            </NavLink>            
            <NavLink className={style.link} to={`/videogames/${props.idVideogame}`}>
                <p className={style.title}  >{props.name}</p>
            </NavLink>            
            <p className={style.p}>{props.genres.join(', ')}</p>
        </div>
    )
}

export default Card;