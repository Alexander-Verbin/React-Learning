import React from "react";
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus } from "../../redux/profileReducer";
import Profile from "./Profile";
import { useParams } from 'react-router-dom';
//import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import { Navigate } from "react-router-dom";

class ProfileContainer extends React.Component {

  componentDidMount() {

    let userId = this.props.params?.userId;
    if (!userId) {
      userId = this.props.autorizedUserId;
    }
    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }

  };

  render() {
    let userId = this.props.params?.userId;
    if (!userId) {
      userId = this.props.autorizedUserId;
      if (!userId) {
        return <Navigate replace to={"/login"} />
      };
    };
    return (
      <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    );
  }
};


const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});


const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};






export default compose(withRouter, connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }))(ProfileContainer);