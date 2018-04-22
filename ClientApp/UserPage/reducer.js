import {userConstants} from './constants';


const initialState = {
  description: '',
  file: ''
};

export const addPhoto = (state = initialState, action ) => {
  switch (action.type) {
  case userConstants.SET_ADD_PHOTO_DESCRIPTION:
    return {
      ...state,
      description: action.description
    };
  case userConstants.SET_ADD_PHOTO_FILE:
    return {
      ...state,
      file: action.file,
    };
  default:
    return state;
  }
};


const initialStateProfile = {
  isLoggedProfilePosts: false,
  posts: [],
};

export const profilePosts = (state = initialStateProfile , action) => {
  switch (action.type) {
  case userConstants.GET_USER_PROFILE_POSTS_REQUEST:
    return {
      ...state,
    };
  case userConstants.GET_USER_PROFILE_POSTS_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoggedProfilePosts: true,
    };
  case userConstants.GET_USER_PROFILE_POSTS_FAILURE:
    return {};
  default:
    return state;
  }
};