import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalUsersCount, pageSize, onPageChenged, users, ...props}) => {
	return <div>
		<Paginator currentPage={currentPage} pageSize={pageSize}
							 onPageChenged={onPageChenged}
							 totalItemsCount={totalUsersCount} />
		<div>
			{
				users.map(u => <User user={u}
														 followingInProgres={props.followingInProgres}
														 key={u.id}
														 unfollow={props.unfollow}
														 follow={props.follow}
					/>
				)
			}
		</div>
	</div>
}

export default Users;