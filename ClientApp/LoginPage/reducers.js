import { combineReducers } from 'redux';
import { loginConstants } from './constants';

const initialState = {
  id: ''
};

const authentication = (state = initialState , action) => {
  switch (action.type) {
  case loginConstants.LOGIN_REQUEST:
    return {

    };
  case loginConstants.LOGIN_SUCCESS:
    return {

    };
  case loginConstants.LOGIN_FAILURE:
    return {};
  default:
    return state;
  }
};

const initialStateFormInput = {
  email: '',
  password: ''
};

const formInput = ( state = initialStateFormInput, action ) => {
  switch (action.type) {
  case loginConstants.SET_EMAIL:
    return {
      ...state,
      email: action.email
    };
  case loginConstants.SET_PASSWORD:
    return {
      ...state,
      password: action.password,
    };
  default:
    return state;
  }
};

export const login = combineReducers({
  authentication,
  formInput
});