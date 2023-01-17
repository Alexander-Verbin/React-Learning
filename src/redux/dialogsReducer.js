const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
  
  switch(action.type){
    case SEND_MESSAGE:
      let body = action.newMessageBoby;
      return {
        ...state,
        messages: [...state.messages, {id: 6, message: body}],
    }
    default:
      return state;
  };
};

export const sendMessageCreator = (newMessageBoby) => {
  return {
    type: SEND_MESSAGE,
    newMessageBoby
  };
};

export default dialogsReducer;