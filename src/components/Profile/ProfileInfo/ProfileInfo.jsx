import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import user from '../../../assets/images/avatar.png'
import backgroun from '../../../assets/images/background.jpg'
import ProfileStatusHooks from "../ProfileStatus/ProfileStatusHooks";

const ProfileInfo = (props) => {
	if (!props.profile) {
		return <Preloader/>
	}

	const onMainPhotoSelected = (e) => {
	  if(e.target.files.length){
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
				<h2 className={s.name}>{props.profile.fullName}</h2>
				<p className={s.dicription}>{props.profile.aboutMe}</p>
				<ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
			</div>
		</div>
	);
};

export default ProfileInfo