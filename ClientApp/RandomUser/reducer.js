import { randomConstants } from './constants';
import {userConstants} from "../UserPage/constants";

const initialStateRandom = {
  isLoggedRandomPosts: false,
  posts: [],
};

export const randomPosts = (state = initialStateRandom , action) => {
  switch (action.type) {
  case randomConstants.GET_RANDOM_USER_PROFILE_POSTS_REQUEST:
    return {
      ...state,
    };
  case randomConstants.GET_RANDOM_USER_PROFILE_POSTS_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoggedRandomPosts: true,
    };
  case randomConstants.GET_RANDOM_USER_PROFILE_POSTS_FAILURE:
    return {};
  case randomConstants.CLEAR_USER_INF:
    return initialStateRandom;
  default:
    return state;
  }
};

const initialStateRandomUser = {
  isLoggedRandomUser: false,
  user: {},
};

export const randomUser = (state = initialStateRandomUser , action) => {
  switch (action.type) {
  case randomConstants.GET_RANDOM_USER_REQUEST:
    return {
      ...state,
    };
  case randomConstants.GET_RANDOM_USER_SUCCESS:
    return {
      ...state,
      user: action.user,
      isLoggedRandomUser: true,
    };
  case randomConstants.GET_RANDOM_USER_FAILURE:
    return {};
  case randomConstants.CLEAR_USER_INF:
    return initialStateRandomUser;
  default:
    return state;
  }
};

const initialState = {
  description: '',
  file: ''
};

export const addPhoto = (state = initialState, action ) => {
  switch (action.type) {
  case randomConstants.SET_ADD_PHOTO_DESCRIPTION:
    return {
      ...state,
      description: action.description
    };
  case randomConstants.SET_ADD_PHOTO_FILE:
    return {
      ...state,
      file: action.file,
    };
  default:
    return state;
  }
};

const initialStateFollowers = {
  isLoadedFollowers: false,
  followers: [],
};

export const followers = (state = initialStateFollowers , action) => {
  switch (action.type) {
  case randomConstants.GET_FOLLOWERS_REQUEST:
    return {
      ...state,
    };
  case randomConstants.GET_FOLLOWERS_SUCCESS:
    return {
      ...state,
      followers: action.followers,
      isLoadedFollowers: true,
    };
  case randomConstants.GET_FOLLOWERS_FAILURE:
    return {};
  default:
    return state;
  }
};

const initialStateFollowing = {
  isLoadedFollowing: false,
  following: [],
};


export const following = (state = initialStateFollowing , action) => {
  switch (action.type) {
  case randomConstants.GET_FOLLOWING_REQUEST:
    return {
      ...state,
    };
  case randomConstants.GET_FOLLOWING_SUCCESS:
    return {
      ...state,
      following: action.following,
      isLoadedFollowing: true,
    };
  case randomConstants.GET_FOLLOWING_FAILURE:
    return {};
  default:
    return state;
  }
};