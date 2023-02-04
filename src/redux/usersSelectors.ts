import { createSelector } from "reselect";
import {AppStateType} from "./reduxStore";

const getUsersFromState = (state: AppStateType) => {
  return state.usersPage.users
};

export const getUsersSuperSelector = createSelector(getUsersFromState,(users)=>{
  return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgres= (state: AppStateType) => {
  return state.usersPage.followingInProgres;
};