import style from './Pagination.module.css'
import { useSelector } from "react-redux";

export const Pagination = ({ page, setPage }) => {
    const allVideogames = useSelector((state) => state.videogames);

    let maxPage = Math.ceil(allVideogames.length / 15);

    const handlerNext = () => {
        setPage(page + 1);
    };

    const handlerPreview = () => {
        if (page > 1) setPage(page - 1);
    };

    return (        
        <div className={style.paginationContainer}>
            <button onClick={() => { handlerPreview() }} className={page > 1 ? style.pageBtn : style.none}>
                PREVIEW PAGE
            </button>
            <p className={style.pageNumber}>{page} of {maxPage}</p>
            <button onClick={() => { handlerNext() }} className={page < maxPage ? style.pageBtn : style.none}>
                NEXT PAGE
            </button>
        </div>
    );
};