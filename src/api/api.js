import axios from "axios";

const baseURL = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/', withCredentials: true, headers: {
		'API-KEY': '3ee61d9c-e5a8-44cc-8044-af512918a01a'
	},
});

export const usersAPI = {
	getUsers(param1, param2) {
		return baseURL.get(`users?page=${param1}&count=${param2}`).then(response => response.data);
	}, follow(userId) {
		return baseURL.post(`follow/${userId}`);
	}, unfollow(userId) {
		return baseURL.delete(`follow/${userId}`);
	},
};

export const profileAPI = {
	getProfile(userId) {
		return baseURL.get(`profile/${userId}`);
	},
	getStatus(userId) {
		return baseURL.get(`profile/status/${userId}`);
	},
	updateStatus(status) {
		return baseURL.put(`profile/status`, {status: status});
	},
	savePhoto(photoFile) {
		const formData = new FormData();
		formData.append("image", photoFile)
		return baseURL.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},
	saveProfile(profile) {
		return baseURL.put(`profile`, profile);
	}
};

export const authAPI = {
	me() {
		return baseURL.get(`auth/me`)
	}, login(email, password, remeberMe = false) {
		return baseURL.post(`auth/login`, {email, password, remeberMe});
	}, logout() {
		return baseURL.delete(`auth/login`);
	}
};
