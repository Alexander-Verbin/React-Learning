import React, {Suspense, lazy} from "react";
import "./App.scss";
import {Routes, Route, useParams, BrowserRouter, Navigate} from "react-router-dom";
import {initializeApp} from './redux/appReducer.ts';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Sett from "./components/Sett/Sett";
import Login from "./components/Login/Login";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";

const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));

class App extends React.Component {

	catchAllUnhandleError = (promiseRejectionEvent) => {
		alert("some error");
		console.error(promiseRejectionEvent)
	};
	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener('unhandledrejection',this.catchAllUnhandleError)
	};

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection',this.catchAllUnhandleError)
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader/>
		}
		return (
			<div className="app-wrapper">
				<HeaderContainer/>
				<Navbar/>
				<Suspense fallback={<Preloader/>}>
					<div className="app-wrapper-content">
						<Routes>
							<Route path="/dialogs" element={<DialogsContainer/>}/>
							<Route exact path="/" element={<Navigate replace to={"/profile"}/>}/>
							<Route path="/profile" element={<ProfileContainer/>}>
								<Route path=":userId" element={<ProfileContainer/>}/>
							</Route>
							<Route path="/users" element={<UsersContainer title={"Самураи"}/>}/>
							<Route path="/news" element={<News/>}/>
							<Route path="/music" element={<Music/>}/>
							<Route path="/sett" element={<Sett/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="*" element={<div>404 NOT FOUND</div>}/>
						</Routes>
					</div>
				</Suspense>
			</div>
		)
	}
}

const withRouter = WrappedComponent => props => {
	const params = useParams();
	return (
		<WrappedComponent
			{...props}
			params={params}
		/>
	);
};

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})


const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

export const SamuraiJSApp = (props) => {
	return <BrowserRouter basename={process.env.PUBLIC_URL}>
		<Provider store={store}>
			<AppContainer/>
		</Provider>
	</BrowserRouter>
};
