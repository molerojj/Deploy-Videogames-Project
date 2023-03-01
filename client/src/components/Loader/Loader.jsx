import style from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={style.loadingContainer}>
            <span class={style.loader}></span>
        </div>
    );
};