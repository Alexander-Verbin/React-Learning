import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgres, getUsersSuperSelector } from "../../redux/usersSelectors";
import {UserType} from "../../Types/Types";
import {AppStateType} from "../../redux/reduxStore";

type MapStateProps = {
	currentPage: number
	pageSize: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgres: Array<number>
}

type MapDispatchProps =  {
	getUsers: (currentPage: number,pageSize: number) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}

type OwnProps =  {
	title: string
}

type Props = MapStateProps & MapDispatchProps & OwnProps
class UsersContainer extends React.Component<Props> {

  componentDidMount() {
    const {currentPage,pageSize} = this.props
    this.props.getUsers(currentPage,pageSize);
  };

  onPageChenged = (pageNumber: number) => {
    const {pageSize} =  this.props;
    this.props.getUsers(pageNumber,pageSize);
  };

  render() {
    return <>
			<h2>{this.props.title}</h2>
      {this.props.isFetching ? <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChenged={this.onPageChenged}
        users={this.props.users}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
        followingInProgres={this.props.followingInProgres} />
    </>
  };
};


const mapStateToProps = (state: AppStateType): MapStateProps => {
  return {
    users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgres: getFollowingInProgres(state)
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUsers: (users) => {
//       dispatch(setUsers(users));
//     },
//     follow: (userId) => {
//       dispatch(follow(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollow(userId));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPage(pageNumber));
//     },
//     setUsersTotalCount: (totalCount) => {
//       dispatch(setUsersTotalCount(totalCount));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetching(isFetching));
//     },
//     toggleFollowingProgres: (followingInProgres, userId) => {
//       dispatch(toggleFollowingProgres(followingInProgres, userId));
//     },

//   };
// };



export default compose(withAuthRedirect, connect<MapStateProps,MapDispatchProps,OwnProps,AppStateType>(mapStateToProps, { follow, unfollow, getUsers }))(UsersContainer);