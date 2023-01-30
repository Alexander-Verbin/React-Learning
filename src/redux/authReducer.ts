import {stopSubmit} from "redux-form";
import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

export type AuthInitialStateType = {
	userId: number | null
	email: string | null
	login: string | null
	isFetching: boolean
	isAuth: boolean
	captchaUrl: string | null
}


const initialState: AuthInitialStateType = {
	userId: null,
	email: null,
	login: null,
	isFetching: false,
	isAuth: false,
	captchaUrl: null
};
const authReducer = (state = initialState, action: any): AuthInitialStateType => {
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

export type SetAuthUserDataPayloadType = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}

export type SetAuthUserDataType = {
	type: typeof SET_USER_DATA
	payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => {
	return {
		type: SET_USER_DATA,
		payload: {userId, email, login, isAuth}
	};
};


export type SetCaptchaUrlSuccessType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	payload: {captchaUrl: string}
}

export const setCaptchaUrlSuccess = (captchaUrl: string): SetCaptchaUrlSuccessType => {
	return {
		type: GET_CAPTCHA_URL_SUCCESS,
		payload: {captchaUrl}
	};
};


export const getAuthUserData = () => async (dispatch: any) => {
	const response = await authAPI.me();
	if (response.data.resultCode === 0) {
		let {id, email, login} = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
	const response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export const getCaptchaUrl = () => async (dispatch: any) => {
	const response = await securityAPI.getCaptchaUrl();
	const captchaUrl = response.data.url;
	dispatch(setCaptchaUrlSuccess(captchaUrl))
};

export default authReducer;
