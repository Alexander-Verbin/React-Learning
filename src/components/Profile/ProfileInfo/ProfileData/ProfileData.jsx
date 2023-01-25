import React from "react";
import s from "../ProfileInfo.module.scss";
import {Contact} from "../Contact/Contact";

export const ProfileData = (props) => {
	return(
		<div>
			<h2 className={s.name}>Full name: <b>{props.profile.fullName}</b></h2>
			<div className={s.dicription}>
				<p className={s.text}>Looking for a job: <span>{props.profile.lookingForAJob ? "Yes" : "No"}</span></p>
				{props.profile.lookingForAJob
					? <p className={s.text}>My professional skills: <span>{props.profile.lookingForAJobDescription}</span></p>
					: null
				}
				<p className={s.text}>About me: <span>{props.profile.aboutMe}</span></p>
			</div>
			<div className={s.contacts}>
				<h4 className={s.contacts__title}>Contacts:</h4>
				{Object.keys(props.profile.contacts).map(key => (
					<Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
				))}
			</div>
			{ props.isOwner
				?<div>
					<button onClick={props.goToEditMode}>edit</button>
				</div>
				: null
			}
		</div>
	)
}