import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_STATUS = "DELETE_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: "12" },
    { id: 2, message: "It's my first post", likesCount: "23" },
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

export const deletePost = (postId) => {
  return {
    type: DELETE_STATUS,
    postId
  };
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then(response => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
      dispatch(setStatus(response.data));
    });
  };
};

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
      if(response.data.resultCode === 0) {
        dispatch(setStatus(status));
      } 
    });
  };
};

export default profileReducer;