import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgres, getUsers } from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgres, getUsersSuperSelector } from "../../redux/usersSelectors";


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  };

  onPageChenged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return <>
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

// const mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgres: state.usersPage.followingInProgres
//   };
// };


const mapStateToProps = (state) => {
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



export default compose(withAuthRedirect, connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgres, getUsers }))(UsersContainer);