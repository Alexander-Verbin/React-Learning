import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logout } from "../../redux/authReducer";

class HeaderContainer extends React.Component {

  render() {
    return (
      <Header {...this.props} />
    );
  }

}

const mapStateToPrors = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToPrors, { logout })(HeaderContainer);