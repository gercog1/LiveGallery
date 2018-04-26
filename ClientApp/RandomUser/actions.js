import swal from 'sweetalert';

import { randomConstants } from './constants';
import { randomService } from "./services";
import { globalService } from "../services";



const getRandomPosts = (id) => {
  function request() { return { type: randomConstants.GET_RANDOM_USER_PROFILE_POSTS_REQUEST }; }
  function success(posts) { return { type: randomConstants.GET_RANDOM_USER_PROFILE_POSTS_SUCCESS, posts }; }
  function failure(error) { return { type: randomConstants.GET_RANDOM_USER_PROFILE_POSTS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    randomService.getProfilePosts(id)
      .then(response => {
        dispatch(success(response.data));

      })
      .catch(error => {
        dispatch(failure(error));

      });
  };
};

const setLike = (postId, userId) => (dispatch) => {
  globalService.setLike(postId, userId)
    .then(response => {
      dispatch(getRandomPosts(userId));

    })
    .catch(error => {
      swal(error.message, '', 'error');
    });
};


const getRandomUser = (id) => {
  function request() { return { type: randomConstants.GET_RANDOM_USER_REQUEST }; }
  function success(user) { return { type: randomConstants.GET_RANDOM_USER_SUCCESS, user }; }
  function failure(error) { return { type: randomConstants.GET_RANDOM_USER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    randomService.getUser(id)
      .then(response => {
        dispatch(success(response.data));

      })
      .catch(error => {
        dispatch(failure(error));

      });
  };
};

const actions = {
  getRandomPosts,
  setLike,
    getRandomUser
};

export default actions;