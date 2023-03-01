import style from './Landing.module.css';
import logo from '../../img/logo-gv.png';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getVideogames, changeLoader } from "../../redux/actions";
import { useEffect } from "react";



const Landing = () => {

    const dispatch = useDispatch();

useEffect(() => {
    dispatch(changeLoader());
    dispatch(getVideogames())
},[dispatch])

    return (
        <div className={style.container}>
            <img className={style.logo} src={logo} alt='logo' />
            <Link to='/home' className={style.button}>START</Link>
        </div>
    )
}

export default Landing;