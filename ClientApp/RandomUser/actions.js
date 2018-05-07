import swal from 'sweetalert';

import { randomConstants } from './constants';
import { randomService } from "./services";
import { globalService } from "../services";
import {userService} from "../UserPage/services";
import {userConstants} from "../UserPage/constants";



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

const setLike = (postId, id, userId) => (dispatch) => {
  globalService.setLike(postId, id)
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

const clearUserInf = () => ({ type: randomConstants.CLEAR_USER_INF });


const setDescription = description => ({ type: randomConstants.SET_ADD_PHOTO_DESCRIPTION, description });
const setFile = file => ({ type: randomConstants.SET_ADD_PHOTO_FILE, file });

const addPhoto = (closeModal) => (dispatch, getState) => {
  const { addPhoto: { description, file }} = getState();
  randomService.addPhoto(description, file)
    .then(response => {
      dispatch(getRandomPosts(localStorage.getItem('id')));
      swal('success', '', 'success');
      closeModal();
    })
    .catch(error => {

      swal(error.message, '', 'error');
    });
};

const actions = {
  getRandomPosts,
  setLike,
  getRandomUser,
  clearUserInf,
    setDescription,
    setFile,
    addPhoto,

};

export default actions;