import React from "react";
import s from './Users.module.scss'
import {NavLink} from "react-router-dom";
import avatar from "../../assets/images/avatar.png"

const User = ({user,followingInProgres,follow,unfollow}) => {

    return (
        <div>
            <div>
              <NavLink to={'/profile/' + user.id}>
                <img className={s.avatar} src={user.photos.small != null ? user.photos.small : avatar} alt="User"/>
              </NavLink>
            </div>
            <div>
              {user.followed ? <button disabled={followingInProgres.some(id => id === user.id)} onClick={() => {
                      unfollow(user.id)
                  }}>Unfollow</button> :
                  <button disabled={followingInProgres.some(id => id === user.id)} onClick={() => {
                      follow(user.id)
                  }}>Follow</button>}
            </div>
            <div>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </div>
            <div>
              <div>{'user.location.country'}</div>
              <div>{'user.location.city'}</div>
            </div>
        </div>
    );
};

export default User;