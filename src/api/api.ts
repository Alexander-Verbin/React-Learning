import axios from "axios";
import {ProfileType} from "../Types/Types";

const baseURL = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': '3ee61d9c-e5a8-44cc-8044-af512918a01a'
	},
});

export const usersAPI = {
	getUsers(param1: number, param2: number) {
		return baseURL.get(`users?page=${param1}&count=${param2}`).then(response => response.data);
	},
	follow(userId: number) {
		return baseURL.post(`follow/${userId}`);
	},
	unfollow(userId: number) {
		return baseURL.delete(`follow/${userId}`);
	},
};

export const profileAPI = {
	getProfile(userId: number) {
		return baseURL.get(`profile/${userId}`);
	},
	getStatus(userId: number) {
		return baseURL.get(`profile/status/${userId}`);
	},
	updateStatus(status: string) {
		return baseURL.put(`profile/status`, {status: status});
	},
	savePhoto(photoFile: any) {
		const formData = new FormData();
		formData.append("image", photoFile)
		return baseURL.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	saveProfile(profile: ProfileType) {
		return baseURL.put(`profile`, profile);
	}
};

export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}
export enum ResultCodeForCaptchaEnum {
	CaptchaIsRequired = 10
}

type MeResponseType = {
	data: {id: number, email: string, login: string}
	resultCode: ResultCodesEnum
	messages: Array<string>
}
type LoginResponseType = {
	data: {userId: number}
	resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
	messages: Array<string>
}
export const authAPI = {
	me() {
		return baseURL.get<MeResponseType>(`auth/me`).then(response => response.data)
	},
	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return baseURL.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
			.then(response => response.data);
	},
	logout() {
		return baseURL.delete(`auth/login`);
	}
};

export const securityAPI = {
	getCaptchaUrl() {
		return baseURL.get(`security/get-captcha-url`)
	},

};
