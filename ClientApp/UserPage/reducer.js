import {userConstants} from './constants';

const initialState = {
  isLoadedUser: false,
  followers: [],
  following: []
};

export const userProfile = (state = initialState , action) => {
  switch (action.type) {
  case userConstants.GET_USER_PROFILE_REQUEST:
    return {
      ...state,
    };
  case userConstants.GET_USER_PROFILE_SUCCESS:
    return {
      ...state,
      followers: action.user.followers,
      following: action.user.followings,
      isLoadedUser: true,
    };
  case userConstants.GET_USER_PROFILE_FAILURE:
    return {};
  default:
    return state;
  }
};