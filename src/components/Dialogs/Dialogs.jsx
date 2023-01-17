import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Textarea } from "../common/FormsControls/FormsControls";
import DialogItem from "./DialogItem/DialogItem";
import s from './Dialogs.module.css';
import Message from "./Message/Message";


const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBoby)
  }

  return (
    <div className={s.dialogs}>
      <ul className={s.dialogsItems}>
        {dialogsElements}
      </ul>
      <div className={s.messages}>
        {messagesElements}
        <div className={s.newMessage}>
          <ReduxDialogForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {

  const maxLength50 = maxLengthCreator(1);

  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name='newMessageBoby' placeholder='Enter your message'
        validate={[required, maxLength50]} />
      <button className={s.button}>Send</button>
    </form>
  );
};

const ReduxDialogForm = reduxForm({
  form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs;