import React from "react";
import {connect} from "react-redux";
import {getUserProfile, getStatus, updateStatus, savePhoto} from "../../redux/profileReducer";
import Profile from "./Profile";
import {useParams} from 'react-router-dom';
import {compose} from "redux";
import {Navigate} from "react-router-dom";

class ProfileContainer extends React.Component {

	refreshProfile() {
		let userId = this.props.params?.userId;
		if (!userId) {
			userId = this.props.autorizedUserId;
		}
		if (userId) {
			this.props.getUserProfile(userId);
			this.props.getStatus(userId);
		}
	}

	componentDidMount() {
		this.refreshProfile();
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.params?.userId !== prevProps.params?.userId)
		this.refreshProfile();
	}

	render() {
		let userId = this.props.params?.userId;
		if (!userId) {
			userId = this.props.autorizedUserId;
			if (!userId) {
				return <Navigate replace to={"/login"}/>
			}
			;
		}
		;
		return (
			<Profile {...this.props} profile={this.props.profile} status={this.props.status}
							 updateStatus={this.props.updateStatus} isOwner={!this.props.params?.userId} savePhoto={this.props.savePhoto}/>
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


export default compose(withRouter, connect(mapStateToProps, {
	getUserProfile,
	getStatus,
	updateStatus,
	savePhoto
}))(ProfileContainer);