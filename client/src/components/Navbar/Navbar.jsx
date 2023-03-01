import { Link } from 'react-router-dom';
import style from "./Navbar.module.css";
import { useEffect, useState } from "react"
import { alphabeticalOrder, filterByGenre, getGenres, getVideogames, orderByRating, filterBySource } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faStar, faFilter, faGamepad, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { changeLoader } from '../../redux/actions';


const Navbar = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    },[dispatch])

    const onClick = () => {
        dispatch(getVideogames());
        dispatch(changeLoader());
        setOrder1('');
        setOrder2('');
        setOrder3('');
        setOrder4('');
    }

    const [ order1, setOrder1 ] = useState('');
    const [ order2, setOrder2 ] = useState('');
    const [ order3, setOrder3 ] = useState('');
    const [ order4, setOrder4 ] = useState('');

    const allGenres = useSelector(state => state.genres)
    
    const handlerAlphabeticalOrder = (e) => {
        e.preventDefault();
        if (e.target.value) dispatch(alphabeticalOrder(e.target.value));
        setOrder1(e.target.value);
    }

    const handlerRatingOrder = (e) => {
        e.preventDefault();
        if (e.target.value) dispatch(orderByRating(e.target.value));
        setOrder2(e.target.value);
    }

    const handlerFilterBySource = (e) => {
        e.target.value && dispatch(filterBySource(e.target.value));
        setOrder3(e.target.value)
    }

    const handlerFilterGenres = (e) => {
        e.target.value && dispatch(filterByGenre(e.target.value));
        setOrder4(e.target.value)
    }

    return (
        <div className = {style.container}>
            <span className={style.spanGame}onClick={onClick}>
                <FontAwesomeIcon className={style.iconGame} icon={faGamepad} />
            </span>
                <p className={style.p}>ALL GAMES</p>
            <div className={style.searching}>
                <SearchBar />
            </div>
            <div className={style.orderFilter}>
                <div className={style.orderContainer}>
                    <FontAwesomeIcon className={style.icons} icon={faArrowDownAZ}/>
                    <label className={style.label} htmlFor="order">Alphabetical Order </label>
                        <select value={order1} className={style.selectItem}onChange={(e) => handlerAlphabeticalOrder(e)} name="order">
                            <option value="">Select</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                </div>
                <div className={style.orderContainer}>
                    <FontAwesomeIcon className={style.icons} icon={faStar} />
                    <label className={style.label} htmlFor="order">Order by Rating </label>
                        <select value={order2} className={style.selectItem}onChange={(e) => handlerRatingOrder(e)} name="order">
                            <option value="">Select</option>
                            <option value="0-5">Less rated</option>
                            <option value="5-0">Most rated</option>
                        </select>
                </div>
                <div className={style.orderContainer}>
                    <FontAwesomeIcon className={style.icons} icon={faDatabase} />
                    <label className={style.label} htmlFor="order">Filter by Source </label>
                        <select value={order3} className={style.selectItem}onChange={(e) => handlerFilterBySource(e)} name="order">
                            <option value="">Select</option>
                            <option value="all">All</option>
                            <option value="api">API</option>
                            <option value="db">DB</option>
                        </select>
                </div>
                <div className={style.selectContainer}>
                    <FontAwesomeIcon className={style.icons} icon={faFilter} />
                    <label className={style.label} htmlFor="order">Filter by Genres </label>
                    <select value={order4} onChange={(e) => handlerFilterGenres(e)} className={style.selectItem} name="order">
                        <option value="">Select</option>
                        {allGenres?.map(g => {
                            return (
                                <option key={g.id} value={g.name}>
                                    {g.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <Link to='/create' className={style.button}>CREATE GAME</Link>
        </div>
    )
}

export default Navbar;