import React from "react";
import s from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({totalUsersCount,pageSize,currentPage,onPageChenged,...props}) => {

  return (
    <div className={s.users}>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChenged={onPageChenged}/>
      {
        props.users.map(u =><User user={u} followingInProgres={props.followingInProgres}
                                  follow={props.follow}
                                  unfollow={props.unfollow}
                                  key={u.id}/> )
      }
    </div>
  );
};

export default Users;