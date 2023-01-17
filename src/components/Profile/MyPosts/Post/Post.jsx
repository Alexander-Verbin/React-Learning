import React from "react";
import s from './Post.module.css'

const Post = (props) => {
  return (
    <div className={s.post}>
      <div className={s.item}>
        <img src="https://slovnet.ru/wp-content/uploads/2018/12/6-17.png" alt="avatar" className={s.avatar} />
        <p className={s.text}>{props.message}</p>
        <div><span> like</span> {props.likesCount}
        </div>
      </div>
    </div>
  );
}

export default Post;