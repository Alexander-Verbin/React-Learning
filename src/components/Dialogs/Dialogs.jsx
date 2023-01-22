import React from "react";
import { Field, reduxForm } from "redux-form";
import DialogItem from "./DialogItem/DialogItem";
import s from './Dialogs.module.scss';
import Message from "./Message/Message";


const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

	let addNewMessage = (values) => {
		props.sendMessage(values.newMessageBody);
	}

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={s.messages}>
        {messagesElements}
        <div className={s.newMessage}>
					<AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component="textarea" name="newMessageBody" placeholder="Enter your message" />
			</div>
			<div><button>Send</button></div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);


export default Dialogs;