import React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {login} from "../../redux/authReducer";
import s from "./Login.module.scss";
import {Navigate} from "react-router-dom";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if (props.isAuth) {
        return <Navigate replace to={"/profile"}/>
    }
    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Login</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {createField("email", "email", "email", Input, [required])}
            {createField("password", "password", "password", Input, [required])}
            {createField("checkbox", "Remember me", null, Input, null, "Remember me")}
            {props.error && <div className={s.error}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);