import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import s from './MyPosts.module.scss'
import Post from "./Post/Post";


const MyPosts = React.memo((props) => {
  let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />);

  const addNewPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <ReduxMyPostsForm onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>
        {postsElement}
      </div>
    </div>
  );
});

let maxLength10 = maxLengthCreator(10);

const addPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component={Textarea} placeholder='Enter your post' validate={[required, maxLength10]} />
      </div>
      <div>
        <button className={s.button}>Add post</button>
      </div>
    </form>
  )
};

const ReduxMyPostsForm = reduxForm({
  form: 'profileAddPostForm'
})(addPostForm)

export default MyPosts;