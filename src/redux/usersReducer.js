import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/oblectHelper";

const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW ";
const UNFOLLOW = "UNFOLLOW";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgres: [],
};
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: [...action.users]};
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,"id",action.userId,{followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,"id",action.userId,{followed: false})
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT :
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING :
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRES :
            return {
                ...state,
                followingInProgres: action.followingInProgres
                    ? [...state.followingInProgres, action.userId]
                    : state.followingInProgres.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    };
};

export const followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId,
    };
};

export const unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId,
    };
};

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    };
};

export const setUsersTotalCount = (totalCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    };
};

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    };
};

export const toggleFollowingProgres = (followingInProgres, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRES,
        followingInProgres,
        userId
    };
};

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch,userId,apiMethod,actionCreater)  => {
    dispatch(toggleFollowingProgres(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreater(userId))
    }
    ;
    dispatch(toggleFollowingProgres(false, userId));
};
export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),followSuccess);
};

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch,userId,usersAPI.unfollow.bind(usersAPI),unfollowSuccess);
};
export default usersReducer;
