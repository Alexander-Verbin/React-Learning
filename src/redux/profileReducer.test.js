import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: "12" },
    { id: 2, message: "It's my first post", likesCount: "23" },
  ]
};

test('new post should be added', () => {
  let action = addPostActionCreator('it it super');
  let newState = profileReducer(state,action);

  expect(newState.posts.length).toBe(3)
});

test('message should be', () => {
  let action = addPostActionCreator('it it super');
  let newState = profileReducer(state,action);

  expect(newState.posts[2].message).toBe('it it super')
});

test('delete message, and length must be decrement', () => {
  let action = deletePost(1);
  let newState = profileReducer(state,action);

  expect(newState.posts.length).toBe(1)
});

