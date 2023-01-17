import React from "react";
import s from './FormsControls.module.css';

const FormsControl = ({ input, meta, child, ...props }) => {
  const error = meta.touched && meta.error;

  return (<div className={s.wrapper + " " + (error ? s.error : '')}>
    <div>
      {props.children}
    </div>
    <div>
      {error && <span>{meta.error}</span>}
    </div>
  </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (<FormsControl {...props}><textarea {...input} {...restProps} /></FormsControl>);
};

export const Input = (props) => {

  const { input, meta, child, ...restProps } = props;

  return (<FormsControl {...props}><input {...input} {...restProps} /></FormsControl>);
};