import React from "react";
import s from "../ProfileInfo.module.scss";
import style from "../../../Login/Login.module.scss";
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{ props.error
				? <div className={style.error}>
					{props.error}
				</div>
				: null
			}
			<h2 className={s.name}>Full name: <span>{createField("text", "fullName", "Full Name", Input, [])}</span></h2>
			<div className={s.dicription}>
				<div className={s.text}>Looking for a
					job: <span> {createField("checkbox",
						"lookingForAJob",
						"", Input,
						[],
						'check if you looking job now',)}</span></div>
				<div className={s.text}>
					{createField("textarea",
						"lookingForAJobDescription",
						"My professional skills", Textarea,
						[])}
				</div>
				<div className={s.text}>About me: {createField("textarea",
					"aboutMe",
					"About me",
					Textarea,
					[])}</div>
			</div>
			<div className={s.contacts}>
				<h4 className={s.contacts__title}>Contacts:</h4>
				{Object.keys(props.profile.contacts).map(key => (
					<div key={key} className={s.contact}>
						<b>{key}:</b>
						<span>{createField("text", "contacts." + key, key, Input, [])}</span>
					</div>
				))}
			</div>
				<div>
					<button>save</button>
				</div>
		</form>
	)
}
const ProfileDataFormReduxForm = reduxForm({form: 'editProfile'})(ProfileDataForm)
export default ProfileDataFormReduxForm