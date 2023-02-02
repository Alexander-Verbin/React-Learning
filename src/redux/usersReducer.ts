import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/oblectHelper";
import {UserType} from "../Types/Types";

const SET_USERS = "SET_USERS";
const FOLLOW = "FOLLOW ";
const UNFOLLOW = "UNFOLLOW";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgres: [] as Array<number> // array of users id,
};

export type UserInitialStateType = typeof initialState
const usersReducer = (state = initialState, action: any): UserInitialStateType => {
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

type SetUsersType = {
		type: typeof SET_USERS
		users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):SetUsersType => {
    return {
        type: SET_USERS,
        users,
    };
};


type FollowSuccessType = {
	type: typeof FOLLOW
	userId: number
}
export const followSuccess = (userId: number):FollowSuccessType => {
    return {
        type: FOLLOW,
        userId,
    };
};

type UnfollowSuccessType = {
	type: typeof UNFOLLOW
	userId: number
}

export const unfollowSuccess = (userId: number):UnfollowSuccessType => {
    return {
        type: UNFOLLOW,
        userId,
    };
};


type SetCurrentPageType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    };
};

type SetUsersTotalCountType = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalCount: number
}

export const setUsersTotalCount = (totalCount: number):SetUsersTotalCountType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    };
};

type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    };
};


type ToggleFollowingProgresType = {
		type: typeof TOGGLE_IS_FOLLOWING_PROGRES
		isFetching: boolean
		userId: number
};

export const toggleFollowingProgres = (isFetching:boolean, userId: number): ToggleFollowingProgresType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRES,
				isFetching,
        userId
    };
};

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch: any,userId: number,apiMethod: any,actionCreater: any)  => {
    dispatch(toggleFollowingProgres(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreater(userId))
    }
    ;
    dispatch(toggleFollowingProgres(false, userId));
};
export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),followSuccess);
};

export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch,userId,usersAPI.unfollow.bind(usersAPI),unfollowSuccess);
};
export default usersReducer;
