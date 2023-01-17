import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/authReduser";
import s from "./Login.module.css";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  };

  if (props.isAuth) {
    return <Navigate replace to={"/profile"} />
  }
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Login</h2>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field type="email" name={"email"} placeholder="email" component={Input} validate={[required]} />
      </div>
      <div>
        <Field type="password" name={"password"} placeholder="password" component={Input} validate={[required]} />
      </div>
      <div>
        <Field component={Input} name={"Remember me"} type="checkbox" /> remeber me
      </div>
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

export default connect(mapStateToProps, { login })(Login);