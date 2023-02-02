import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/Types";


const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_STATUS = "DELETE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

const initialState = {
	posts: [
		{id: 1, message: "Hi, how are you?", likesCount: 12},
		{id: 2, message: "It's my first post", likesCount: 23},
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: "",
	newPostText: ""
};

export type ProfileInitialStateType = typeof initialState
const profileReducer = (state = initialState, action:any):ProfileInitialStateType => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0,
			};
			return {
				...state,
				newPostText: "",
				posts: [...state.posts, newPost],
			};
		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile,
			};
		case SET_STATUS:
			return {
				...state,
				status: action.status,
			};
		case DELETE_STATUS:
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId),
			};
		case SAVE_PHOTO_SUCCESS:
			return {
				...state,
				profile: {...state.profile, photos: action.photos} as ProfileType,
			};
		default:
			return state;
	}
};


type AddPostActionCreatorType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPostActionCreator = (newPostText: string):AddPostActionCreatorType => {
	return {
		type: ADD_POST,
		newPostText
	};
};

type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):SetUserProfileType => {
	return {
		type: SET_USER_PROFILE,
		profile,
	};
};

type SetStatusType = {
	type: typeof SET_STATUS
	status: string
}
export const setStatus = (status: string): SetStatusType => {
	return {
		type: SET_STATUS,
		status
	};
};

type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessType => {
	return {
		type: SAVE_PHOTO_SUCCESS,
		photos
	};
};

type DeletePostType = {
	type: typeof DELETE_STATUS
	postId: number
}
export const deletePost = (postId: number):DeletePostType => {
	return {
		type: DELETE_STATUS,
		postId
	};
};

export const getUserProfile = (userId: number) => async (dispatch: any) => {
	let response = await profileAPI.getProfile(userId);
	dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));

};

export const updateStatus = (status: string) => async (dispatch: any) => {
	try {
		let response = await profileAPI.updateStatus(status);
		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	}catch (error){
		console.log(error)
	}

};

export const savePhoto = (file: any) => async (dispatch: any) => {
	let response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any,getState: any) => {
	const userId = getState().auth.userId
	const response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
	}else {
		const errorMsg = response.data.messages[0];
		let contactsName  = errorMsg.split('>')[1].split(')')[0] ;
		let modified = contactsName.toLowerCase();
		const action = stopSubmit('editProfile', { "contacts": { [modified]  : "Не верный формат " + contactsName } } );
		dispatch(action);
		return Promise.reject()
	}
};

export default profileReducer;
