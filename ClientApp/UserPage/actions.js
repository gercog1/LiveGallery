import swal from 'sweetalert';

import { userConstants } from './constants';
import {userService} from "./services";


const setDescription = description => ({ type: userConstants.SET_ADD_PHOTO_DESCRIPTION, description });
const setFile = file => ({ type: userConstants.SET_ADD_PHOTO_FILE, file });

const addPhoto = () => (dispatch, getState) => {
  const { addPhoto: { description, file }} = getState();
  userService.addPhoto(description, file)
    .then(response => {
      dispatch(getPosts());
      swal('success', '', 'success');
    })
    .catch(error => {

      swal(error.message, '', 'error');
    });
};

const getPosts = () => {
  function request() { return { type: userConstants.GET_USER_PROFILE_POSTS_REQUEST }; }
  function success(posts) { return { type: userConstants.GET_USER_PROFILE_POSTS_SUCCESS, posts }; }
  function failure(error) { return { type: userConstants.GET_USER_PROFILE_POSTS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    userService.getProfilePosts()
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

const actions = {
  setDescription,
  setFile,
  addPhoto,
  getPosts,
};

export default actions;