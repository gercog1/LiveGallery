import { randomConstants } from './constants';

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
  default:
    return state;
  }
};