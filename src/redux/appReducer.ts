import {getAuthUserData} from "./authReducer"

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

export type AppInitialStateType = {
	initialized: boolean,
}

const initialState = {
  initialized: false,
};
const appReducer = (state = initialState, action: any): AppInitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return { 
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

export type InitializedSuccessActionType = {
	type: typeof SET_INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => {
  return {
    type: SET_INITIALIZED_SUCCESS,
  };
};

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess())
    })
};



export default appReducer;
