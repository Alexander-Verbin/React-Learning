import React from "react";
import {NavLink} from "react-router-dom";
import s from './Header.module.scss';
import logo from '../../assets/images/logo.png'

const Header = (props) => {
    return (
        <header className={s.header}>
            <img className={s.logo} src={logo} alt="Logo"/>
            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>{props.login} - <button onClick={props.logout} type="button" className={s.logout}>log
                        out</button></div>
                    :
                    <NavLink className={logPage => logPage.isActive ? s.active : s.login} to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;