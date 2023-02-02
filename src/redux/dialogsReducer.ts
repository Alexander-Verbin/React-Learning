const SEND_MESSAGE = 'SEND-MESSAGE';

export type DialogsInitialStateType = typeof initialState

type DialogsType = {
	id: number
	name: string
}

type MessageType = {
	id: number
	message: string
}

const initialState = {
  dialogs: [
    { id: 1, name: 'Sasha' },
    { id: 2, name: 'Maxim' },
    { id: 3, name: 'Misha' },
    { id: 4, name: 'Leha' },
    { id: 5, name: 'Egor' },
    { id: 6, name: 'Kolya' }
  ] as Array<DialogsType>,

  messages: [
    { id: 1, message: 'Hi!' },
    { id: 2, message: 'How is your IT?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' }
  ] as Array<MessageType>,
}

const dialogsReducer = (state = initialState, action: any):DialogsInitialStateType => {
  
  switch(action.type){
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, {id: 6, message: body}],
    }
    default:
      return state;
  }
};


type SendMessageCreatorType = {
	type: typeof SEND_MESSAGE
	newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string):SendMessageCreatorType => {
  return {
    type: SEND_MESSAGE,
    newMessageBody
  };
};

export default dialogsReducer;