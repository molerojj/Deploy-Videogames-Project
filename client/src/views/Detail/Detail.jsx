import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { getVideogameDetail, cleanID, deleteGame } from "../../redux/actions";
import style from "./Detail.module.css";
import logo from '../../img/logo-gv.png';


const Detail = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idVideogame = useParams();
    let id = idVideogame.id;

    useEffect(() => {
        dispatch(getVideogameDetail(id))
        return () => { 
            dispatch(cleanID()); 
        }; 
    },[dispatch, id]);

    const deleteVideogame = (id) => {
        const msg = window.confirm('Do you really want to delete this game?')
        if(msg) {
            const confirm = window.confirm('are you sure?')
            if(confirm){
                dispatch(deleteGame(id))
                navigate('/home')
            }
        }
    }

    const videogameDetail = useSelector((state) => state.videogameDetail);

    let newGenres;
    let newPlatforms;

    if (Array.isArray(videogameDetail.genres)) {
        newGenres = videogameDetail.genres?.map((g) => g.name).join(', ');
        newPlatforms = videogameDetail.platforms?.map((p) => p.name).join(', ');
    } 

    if (typeof videogameDetail.genres === "string") {
        newGenres = videogameDetail.genres;
        newPlatforms = videogameDetail.platforms;
    }

    return (
        <div className={style.mainContainer}>
            <NavLink className={style.back} to="/home">BACK</NavLink>
            <img className={style.logo} src={logo} alt='logo' />
            <div className={style.containerDetail}>
                <div className={style.title}>
                    <h1>{videogameDetail.name}</h1>
                </div>
                <img className={style.img} src={videogameDetail.image} alt=""></img>
                <div className={style.description}>
                    <div className={style.desc}>
                        <h2>DESCRIPTION:</h2>
                        <span>{videogameDetail.description}</span>                        
                    </div>
                    <hr className={style.hr}/>
                    <div className={style.relrat}>
                        <div className={style.relratdetail}>
                            <h2>RELEASED:</h2><p>{videogameDetail.released}</p>
                        </div>
                        <div className={style.relratdetail}>
                            <h2>RATING:</h2><p>{videogameDetail.rating}</p>
                        </div>
                    </div>
                    <div className={style.desc2}>
                        <h2>GENRES:</h2>
                        <span>{newGenres}</span>
                        <h2>PLATFORMS:</h2>
                        <span>{newPlatforms}</span>
                    </div>
                    <button className={style.delete} onClick={() => deleteVideogame(id)}>DELETE GAME</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;