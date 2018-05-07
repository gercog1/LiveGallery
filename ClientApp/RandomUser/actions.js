import swal from 'sweetalert';

import { randomConstants } from './constants';
import { randomService } from "./services";
import { globalService } from "../services";
import {userService} from "../UserPage/services";
import {userConstants} from "../UserPage/constants";
import {listServices} from "../UserList/services";
import userActions from "../UserPage/actions";



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

const deletePost = (postId, userId) => (dispatch) => {
  randomService.deletePhoto(postId)
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
        swal(error.response.data, '', 'error');
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

const getFollowers = (id) => {
  function request() { return { type: randomConstants.GET_FOLLOWERS_REQUEST }; }
  function success(followers) { return { type: randomConstants.GET_FOLLOWERS_SUCCESS, followers }; }
  function failure(error) { return { type: randomConstants.GET_FOLLOWERS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    randomService.getFollowers(id)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
        swal(error.response.data, '', 'error');
      });
  };
};

const getFollowing = (id) => {
  function request() { return { type: randomConstants.GET_FOLLOWING_REQUEST }; }
  function success(following) { return { type: randomConstants.GET_FOLLOWING_SUCCESS, following }; }
  function failure(error) { return { type: randomConstants.GET_FOLLOWING_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    randomService.getFollowing(id)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
        swal(error.response.data, '', 'error');
      });
  };
};

const subscribe = (userId) => (dispatch) => {
  listServices.subscribe(localStorage.getItem('id'), userId)
    .then(response => {
      dispatch(getFollowers(localStorage.getItem('id')));
      dispatch(getFollowing(localStorage.getItem('id')));
      dispatch(userActions.getUserProfile(localStorage.getItem('id')));
      dispatch(getRandomUser(localStorage.getItem('id')));
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
  deletePost,
  getFollowers,
  getFollowing,
  subscribe

};

export default actions;