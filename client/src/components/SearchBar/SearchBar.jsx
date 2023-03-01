import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideogameByName } from "../../redux/actions"
import style from "./SearchBar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const SearchBar = () => {
    
    const [ input, setInput ] = useState("");
    const dispatch = useDispatch();

    const handlerInput = (e) => {
        setInput(e.target.value);
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(getVideogameByName(input));
        setInput(" ");
    }

    return (
        <div className={style.container}>
            <input type="text" value={input} placeholder="Find game" className={style.input} onChange={(e) => handlerInput(e)}/>
            <button type='submit' className={style.button} onClick={(e) => handlerSubmit(e)}><FontAwesomeIcon className={style.icons} icon={faMagnifyingGlass}/></button>
        </div>
    )
}

export default SearchBar;

