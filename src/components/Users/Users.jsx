import React from "react";
import s from './Users.module.css'
import user from '../../assets/images/avatar.png'
import { NavLink } from "react-router-dom";

const Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={s.users}>
      <div>
        {pages.map(p => {
          return <button className={props.currentPage === (p && s.selectedPage) || ''}
            onClick={(e) => { props.onPageChenged(p) }}>{p}</button>
        })}
      </div>
      {
        props.users.map(u => <div key={u.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + u.id}>
                <img className={s.avatar} src={u.photos.small != null ? u.photos.small : user} alt="User" />
              </NavLink>
            </div>
            <div>
              {u.followed ? <button disabled={props.followingInProgres.some(id => id === u.id)} onClick={() => {
                props.unfollow(u.id)
              }}>Unfollow</button> : <button disabled={props.followingInProgres.some(id => id === u.id)} onClick={() => {
                props.follow(u.id)
              }}>Follow</button>}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{'u.location.country'}</div>
              <div>{'u.location.city'}</div>
            </span>
          </span>
        </div>)
      }
    </div>
  );
};

export default Users;