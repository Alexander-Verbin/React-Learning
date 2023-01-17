import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to="/profile" className={navPage => navPage.isActive ? s.active : s.link}>Profile</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/dialogs" className={navPage => navPage.isActive ? s.active : s.link}>Messages</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/users" className={navPage => navPage.isActive ? s.active : s.link}>Users</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/news" className={navPage => navPage.isActive ? s.active : s.link}>News</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/music" className={navPage => navPage.isActive ? s.active : s.link}>Music</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/sett" className={navPage => navPage.isActive ? s.active : s.link}>Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;