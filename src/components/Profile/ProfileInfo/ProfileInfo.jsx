import React, {useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.scss';
import user from '../../../assets/images/avatar.png'
import backgroun from '../../../assets/images/background.jpg'
import ProfileStatusHooks from "../ProfileStatus/ProfileStatusHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm";
import {ProfileData} from "./ProfileData/ProfileData";

const ProfileInfo = (props) => {

	const [editMode, setEditMode] = useState(false);
	const onSubmit = (formData) => {
		props.saveProfile(formData).then(()=>{
			setEditMode(false)
		})
	};

	if (!props.profile) {
		return <Preloader/>
	}
	const onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	};
	return (
		<div>
			<div className={s.imageWrapper}>
				<img src={backgroun} alt="Фон" className={s.image}/>
			</div>
			<div className={s.descriptionBlock}>
				<div className={s.avatarWrapper}>
					<img className={s.avatar} src={props.profile.photos.large != null ? props.profile.photos.large : user}
							 alt="Аватарка"/>
					{props.isOwner && <input onChange={onMainPhotoSelected} type="file"/>}
				</div>
				{	editMode
					? <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
					:	<ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)} }/>
				}
				<ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
			</div>
		</div>
	);
};

export default ProfileInfo