import style from './Page404.module.css';
import { NavLink } from 'react-router-dom'

const Page404 = () => {
    return (
        <div className={style.page404}>
            <div className={style.container}>
                <p>404 NOT FOUND</p>
                <NavLink to='/home' className={style.button}>HOME</NavLink>
            </div>
        </div>
    )
}

export default Page404;