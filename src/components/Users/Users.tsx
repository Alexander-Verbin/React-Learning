import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../Types/Types";

type Props = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChenged: (pageNumber: number) => void
	users: Array<UserType>
	followingInProgres: Array<number>
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}
let Users: React.FC<Props> = ({currentPage, totalUsersCount, pageSize, onPageChenged, users, ...props}) => {
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