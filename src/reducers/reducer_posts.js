import _ from 'lodash';
import { FETCH_POSTS, FETCH_SINGLE_POST, DELETE_POST } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      //if state object has a key of post id,
      // then omit it and return object that doesn't have id anymore
      return _.omit(state, action.payload)
    case FETCH_SINGLE_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;

      //same as above
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

