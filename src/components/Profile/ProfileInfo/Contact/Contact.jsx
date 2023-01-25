import React from "react";
import s from "../ProfileInfo.module.scss";

export const Contact = (props) => {
	return <div className={s.contact}><b>{props.contactTitle}</b>: <a href={props.contactValue} target="_blank" rel="noreferrer" >{props.contactValue}</a></div>
}