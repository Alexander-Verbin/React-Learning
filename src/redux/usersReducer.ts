import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/oblectHelper";
import { UserType} from "../Types/Types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./reduxStore";
import {Dispatch} from "redux";

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
const usersReducer = (state = initialState, action: UsersActionType): UserInitialStateType => {
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


export type UsersActionType = InferActionsType<typeof UsersActions>
export const UsersActions = {
	setUsers: (users: Array<UserType>) => {
		return {
			type: SET_USERS,
			users,
		} as const
	},
	followSuccess: (userId: number)=> {
		return {
			type: FOLLOW,
			userId,
		} as const
	},
	unfollowSuccess: (userId: number) => {
		return {
			type: UNFOLLOW,
			userId,
		} as const
	},
	setCurrentPage: (currentPage: number) => {
		return {
			type: SET_CURRENT_PAGE,
			currentPage
		} as const
	},
	setUsersTotalCount: (totalCount: number) => {
		return {
			type: SET_TOTAL_USERS_COUNT,
			totalCount
		} as const
	},
	toggleIsFetching: (isFetching: boolean) => {
		return {
			type: TOGGLE_IS_FETCHING,
			isFetching
		}as const
	},
	toggleFollowingProgres: (isFetching:boolean, userId: number) => {
		return {
			type: TOGGLE_IS_FOLLOWING_PROGRES,
			followingInProgres: isFetching,
			userId
		} as const
	}
}

type DispatchType = Dispatch<UsersActionType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionType>

export const getUsers = (currentPage: number, pageSize: number):ThunkType  => async (dispatch) => {
    dispatch(UsersActions.toggleIsFetching(true));
    dispatch(UsersActions.setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(UsersActions.toggleIsFetching(false));
    dispatch(UsersActions.setUsers(data.items));
    dispatch(UsersActions.setUsersTotalCount(data.totalCount));
};

const _followUnfollowFlow = async (dispatch: DispatchType,userId: number,apiMethod: any,actionCreater:(userId: number) => UsersActionType) => {
    dispatch(UsersActions.toggleFollowingProgres(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreater(userId))
    }
    dispatch(UsersActions.toggleFollowingProgres(false, userId));
};
export const follow = (userId: number):ThunkType  => async (dispatch) => {
    _followUnfollowFlow(dispatch,userId,usersAPI.follow.bind(usersAPI),UsersActions.followSuccess);
};

export const unfollow = (userId: number):ThunkType  => async (dispatch) => {
    _followUnfollowFlow(dispatch,userId,usersAPI.unfollow.bind(usersAPI),UsersActions.unfollowSuccess);
};
export default usersReducer;
