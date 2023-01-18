import axios from "axios";

const baseURL = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/', withCredentials: true, headers: {
		'API-KEY': 'e9c013ae-2c87-4fde-adf1-22e6a9826cf8'
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
	}, getStatus(userId) {
		return baseURL.get(`profile/status/${userId}`);
	}, updateStatus(status) {
		return baseURL.put(`profile/status`, {status: status});
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
