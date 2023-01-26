import {stopSubmit} from "redux-form";
import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";


const initialState = {
	userId: null,
	email: null,
	login: null,
	isFetching: false,
	isAuth: false,
	captchaUrl: null
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			}
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payload,
			}
		default:
			return state;
	}
};

export const setAuthUserData = (userId, email, login, isAuth) => {
	return {
		type: SET_USER_DATA,
		payload: {userId, email, login, isAuth}
	};
};

export const setCaptchaUrlSuccess = (captchaUrl) => {
	return {
		type: GET_CAPTCHA_URL_SUCCESS,
		payload: {captchaUrl}
	};
};


export const getAuthUserData = () => async (dispatch) => {
	const response = await authAPI.me();
	if (response.data.resultCode === 0) {
		let {id, email, login} = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	const response = await authAPI.login(email, password, rememberMe, captcha);
	if (response.data.resultCode === 0) {
		dispatch(getAuthUserData());
	} else {
		if (response.data.resultCode === 10){
			dispatch(getCaptchaUrl());
		}
		const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
		dispatch(stopSubmit("login", {_error: message}));
	}
};

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl();
	const captchaUrl = response.data.url;
	dispatch(setCaptchaUrlSuccess(captchaUrl))
};

export default authReducer;
