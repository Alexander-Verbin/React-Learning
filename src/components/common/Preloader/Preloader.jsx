import React from "react";
import loading from '../../../assets/svg/loading.svg';
import s from './Preloader.module.css'

const Preloader = () => {
  return (<div className={s.preloader}>
    <img src={loading} alt='Загрузка' />
  </div>
  );
};

export default Preloader;