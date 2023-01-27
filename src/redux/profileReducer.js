import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_STATUS = "DELETE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
	posts: [
		{id: 1, message: "Hi, how are you?", likesCount: "12"},
		{id: 2, message: "It's my first post", likesCount: "23"},
	],
	profile: null,
	status: "",
};
const profileReducer = (state = initialState, action) => {
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
				profile: {...state.profile, photos: action.photos},
			};
		default:
			return state;
	}
};

export const addPostActionCreator = (newPostText) => {
	return {
		type: ADD_POST,
		newPostText
	};
};

export const setUserProfile = (profile) => {
	return {
		type: SET_USER_PROFILE,
		profile,
	};
};

export const setStatus = (status) => {
	return {
		type: SET_STATUS,
		status
	};
};

export const savePhotoSuccess = (photos) => {
	return {
		type: SAVE_PHOTO_SUCCESS,
		photos
	};
};

export const deletePost = (postId) => {
	return {
		type: DELETE_STATUS,
		postId
	};
};

export const getUserProfile = (userId) => async (dispatch) => {
	let response = await profileAPI.getProfile(userId);
	dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));

};

export const updateStatus = (status) => async (dispatch) => {
	try {
		let response = await profileAPI.updateStatus(status);
		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	}catch (error){
		console.log(error)
	}

};

export const savePhoto = (file) => async (dispatch) => {
	let response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};

export const saveProfile = (profile) => async (dispatch,getState) => {
	const userId = getState().auth.userId
	const response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
	}else {
		const errorMsg = response.data.messages[0];
		let contactsName  = errorMsg.split('>')[1].split(')')[0] ;
		let modified = contactsName.toLowerCase(); // toLowerCase() - перевод в низний регистр
		const action = stopSubmit('editProfile', { "contacts": { [modified]  : "Не верный формат " + contactsName } } );
		dispatch(action);
		return Promise.reject()
	}
};

export default profileReducer;
