import axios from 'axios';

const root_url = 'http://reduxblog.herokuapp.com/api';
const api_key = '?key=72656394';

export const FETCH_POSTS = 'fetch_posts';
export function fetchPosts() {
  const request = axios.get(`${root_url}/posts${api_key}`);
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export const CREATE_POST = 'create_post';
export function createPost(values, callback) {
  //promise is returned by axios.post
  const request = axios.post(`${root_url}/posts${api_key}`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  }
}

export const FETCH_SINGLE_POST = 'fetch_single_post';
export function fetchSinglePost(id) {
  //promise is returned by axios.post
  const request = axios.get(`${root_url}/posts/${id}${api_key}`);

  return {
    type: FETCH_SINGLE_POST,
    payload: request
  }
}

export const DELETE_POST = 'delete_post';
export function deletePost(id, callback) {
  //promise is returned by axios.post
  const request = axios.delete(`${root_url}/posts/${id}${api_key}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}
