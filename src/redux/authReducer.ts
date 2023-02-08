import {stopSubmit} from "redux-form";
import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

export type AuthInitialStateType = typeof initialState


const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isFetching: false,
	isAuth: false,
	captchaUrl: null as string | null
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
	const meData = await authAPI.me();
	if (meData.resultCode === ResultCodesEnum.Success) {
		let {id, email, login} = meData.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
	const loginData = await authAPI.login(email, password, rememberMe, captcha);
	if (loginData.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData());
	} else {
		if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
			dispatch(getCaptchaUrl());
		}
		const message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
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
