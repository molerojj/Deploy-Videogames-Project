import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import style from './Form.module.css';
import { getGenres, getPlatforms, postVideogame } from "../../redux/actions";
import { validation } from "./validation";

const Form = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const allGenres = useSelector(state => state.genres)
    const allPlatforms = useSelector(state => state.platforms)

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())
    },[dispatch])
    
    const [ errors, setErrors] = useState({})

    const [ form, setForm ] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
        image: ""
    })

    const deleteOptionGenres = (e, ele) => {
        e.preventDefault();
        const newGenres = form.genres.filter((el) => el !== ele);
        setForm({
            ...form,
            genres: newGenres,
        });
    };
    
    const deleteOptionPlatforms = (e, ele) => {
        e.preventDefault();
        const newPlatforms = form.platforms.filter((el) => el !== ele);
        setForm({
            ...form,
            platforms: newPlatforms,
        });
    };

    const validateForm = () => {
        let x = form.name;
        let y = form.description;
        let z = form.platforms.map(p => p);
        if (x === "" || y === "" || z.length < 1) { 
            return false;
        } return true;
    }

    const changeHandler = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({
            ...form,
            [property]: value
        });
        setErrors(
            validation({
                ...form,
                [property]: value
            }
        ))
    };

    const handlerselectvalue = (e) => {
        if (form[e.target.name].includes(e.target.value) === false) {
            setForm({
                ...form,
                [e.target.name]: [...form[e.target.name], e.target.value],
            });
        } else {
            return alert("Cannot repeat the same choice");
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        let vld = validateForm();
        if(vld){
            dispatch(postVideogame(form));
            event.target.reset();
            setForm({
                name: "",
                description: "",
                released: "",
                rating: 0,
                platforms: [],
                genres: [],
                image: ""
            })
            // const msg = window.confirm(`Videogame "${form.name}" has been created. Go to Videogames?`);
            //     if (msg === true) {
            //     navigate('/home')
            // }
        } else {
            alert("Name, Description and Platforms are required");
        }
    }

    return (
        <div className={style.mainContainer}>
            <form className={style.formContainer} onSubmit={submitHandler}>
                <div className={style.formAll}>
                    <div className={style.form1}>
                        <div>
                            <label>Name: </label>
                            <input className={style.input} placeholder="Game's name" type="text" value={form.name} onChange={changeHandler} name="name" />
                            {errors.name && <p className={style.danger}>{errors.name}</p>}
                        </div>
                        <div>
                            <label>Description: </label>
                            <textarea className={style.textarea} placeholder="Add description" type="text" rows="6" cols="35" maxLength="300" value={form.description} onChange={changeHandler} name="description"/>
                            {errors.description && <p className={style.danger}>{errors.description}</p>}
                        </div>
                        <div>
                            <label>Released: </label>
                            <input className={style.input} type="date" value={form.released} onChange={changeHandler} name="released"/>
                        </div>
                        <div>
                            <label>Rating: </label>
                            <input className={style.input} placeholder="1 to 5"type="number" value={form.rating} onChange={changeHandler} name="rating"/>
                            {errors.rating && <p className={style.danger}>{errors.rating}</p>}
                        </div>
                        <div>
                            <label>Image URL: </label>
                            <input className={style.input} placeholder="Type URL..." type="text" value={form.image} onChange={changeHandler} name="image"/>
                        </div>
                    </div>
                    <div className={style.form2}>
                        <div className={style.selectsForm}>
                            <div className={style.selectForm}>
                                <label>Platforms: </label>
                                <select name="platforms" className={style.select} onChange={(e) => handlerselectvalue(e)}>
                                    {
                                        allPlatforms?.map(p => {
                                            return (
                                                <option key={p.id} value={p.name}>
                                                    {p.name}
                                                </option>
                                            );
                                        })
                                    };
                                </select>
                                <div>
                                    {form.platforms?.map((ele, i) => {
                                        return (
                                            <div key={i} className={style.optionSelectContainer}>
                                                <p>{ele}</p>
                                                <button className={style.buttonSelect} onClick={(e) => deleteOptionPlatforms(e, ele)}>X</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {errors.platforms && <p className={style.danger}>{errors.platforms}</p>}
                        </div>
                        <div className={style.selectsForm}>
                            <div className={style.selectForm}>
                                <label>Genres: </label>
                                <select name="genres" className={style.select} onChange={(e) => handlerselectvalue(e)}>
                                    {
                                        allGenres?.map(g => {
                                            return (
                                                <option key={g.id} value={g.name}>
                                                    {g.name}
                                                </option>
                                            );
                                        })
                                    };
                                </select>
                                <div>
                                    {form.genres?.map((ele, i) => {
                                        return (
                                            <div key={i} className={style.optionSelectContainer}>
                                                <p>{ele}</p>
                                                <button className={style.buttonSelect} onClick={(e) => deleteOptionGenres(e, ele)}>X</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className={style.button} type="submit">CREATE GAME</button>
                <NavLink to="/home" className={style.navlink}>CANCEL</NavLink>
            </form>
        </div>
    )
}

export default Form;