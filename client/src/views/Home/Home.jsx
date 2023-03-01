import CardsContainer from "../../components/CardsContainer/CardsContainer";
import logo from '../../img/logo-gv.png';
import style from './Home.module.css';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../components/Pagination/Pagination";
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {

    const [page, setPage] = useState(1);
    const [pageBooleano, setPageBooleano] = useState(false);

    useEffect(() => {
        setPageBooleano(false);
    },[])
    

    return (
        <>
        <Navbar/>
        <div className={style.container}>
            <NavLink to="/" className={style.backLanding}>
                <img className={style.logo} src={logo} alt='logo' />
            </NavLink>
            { pageBooleano === false
            ? ( <Pagination page={page} setPage={setPage} />)
            : null }
            <CardsContainer page={page}/>
        </div>
        </>
    )
};

export default Home;
