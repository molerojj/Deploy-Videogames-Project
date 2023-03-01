import style from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={style.loadingContainer}>
            <span className={style.loader}></span>
        </div>
    );
};