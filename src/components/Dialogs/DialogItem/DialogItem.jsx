import React from "react";
import { NavLink } from "react-router-dom";
import s from './DialogItem.module.scss';

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;
  let name = props.name;
  return (
    <li className={s.dialogItem}>
      <NavLink to={path} className={dialogPage => dialogPage.isActive ? s.active : s.dialog}>{name}</NavLink>
    </li>
  );
};

export default DialogItem;