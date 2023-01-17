import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";


let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: '12' },
        { id: 2, message: 'It\'s my first post', likesCount: '23' }
      ],
      newPostText: '',  
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: 'Sasha' },
        { id: 2, name: 'Maxim' },
        { id: 3, name: 'Misha' },
        { id: 4, name: 'Leha' },
        { id: 5, name: 'Egor' },
        { id: 6, name: 'Kolya' }
      ],
    
      messages: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'How is your IT?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
      ],
      
      newMessageBoby: '',
    }
  },
  _callSubscriber() {
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state)
  },
};





window.store = store;

export default store;