import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import user from '../../../assets/images/avatar.png'
import ProfileStatusHooks from "../ProfileStatus/ProfileStatusHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.imageWrapper}>
        <img src="https://user-images.githubusercontent.com/88069082/149673405-b47f71c1-0777-4038-9247-5b0c9d166f22.jpg" alt="Фон" className={s.image} />
      </div>
      <div className={s.descriptionBlock}>
        <img className={s.avatar} src={props.profile.photos.large != null ? props.profile.photos.large : user} alt="Аватарка" />
        <h2 className={s.name}>{props.profile.fullName}</h2>
        <p className={s.dicription}>{props.profile.aboutMe}</p>
        <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo