import { sendMessageCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from 'react-redux'
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBoby) => {
      dispatch(sendMessageCreator(newMessageBoby));
    }
  };
};




export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);