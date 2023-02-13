import React from "react";
import s from './FormsControls.module.scss';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {ValidatorsType} from "../../../utils/validators/validators";

export type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormValuesTypeKeys = keyof LoginFormValuesType

type FormsControlPropsType = {
	meta: WrappedFieldMetaProps
	children: React.ReactNode
}
const FormsControl: React.FC<FormsControlPropsType> = ({meta,children}) => {
	const error = meta.touched && meta.error;

	return (<div className={s.wrapper + " " + (error ? s.error : '')}>
			<div>
				{children}
			</div>
			<div>
				{error && <span>{meta.error}</span>}
			</div>
		</div>
	);
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
	//const {input, meta, child, ...restProps} = props;
	const {input, meta, ...restProps} = props;
	return (<FormsControl {...props}><textarea {...input} {...restProps} /></FormsControl>);
};

export const Input: React.FC<WrappedFieldProps> = (props) => {

	//const {input, meta, child, ...restProps} = props;
	const {input, meta, ...restProps} = props;

	return (<FormsControl {...props}><input {...input} {...restProps} /></FormsControl>);
};

export const createField = (type: string,
														name: LoginFormValuesTypeKeys,
														placeholder: string | undefined,
														component: React.FC<WrappedFieldProps>,
														validate: Array<ValidatorsType> | undefined,
														text = "") => {
	return (
		<div>
			<Field type={type} name={name} placeholder={placeholder} component={component} validate={validate}/> {text}
		</div>
	)
};