import axios from "axios";

const instans = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'e9c013ae-2c87-4fde-adf1-22e6a9826cf8'
  },
});

export const usersAPI = {
  getUsers(param1,param2) {
    return instans.get(`users?page=${param1}&count=${param2}`).then(response => response.data);
  },
  follow(userId) {
    return instans.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instans.delete(`follow/${userId}`);
  },
};

export const profileAPI = {
  getProfile(userId){
    return instans.get(`profile/${userId}`);
  },
  getStatus(userId){
    return instans.get(`profile/status/${userId}`);
  },
  updateStatus(status){
    return instans.put(`profile/status`, {status: status});
  }
};

export const authAPI = {
  me(){
    return instans.get(`auth/me`)
  },
  login(email, password, remeberMe = false){
    return instans.post(`auth/login`, {email, password, remeberMe});
  },
  logout(){
    return instans.delete(`auth/login`);
  }
};
