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