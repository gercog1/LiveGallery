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


const initialStateRegistration = {
  username:'',
  email:'',
  firstName:'',
  lastName:'',
  password:'',
  confirmPassword:'',
  image:'',
};

const registrationInput = ( state = initialStateRegistration, action) => {
  switch (action.type) {
  case loginConstants.SET_REGISTRATION_USERNAME:
    return {
      ...state,
      username: action.username
    };
  case loginConstants.SET_REGISTRATION_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case loginConstants.SET_REGISTRATION_FIRST_NAME:
    return {
      ...state,
      firstName: action.firstName,
    };
  case loginConstants.SET_REGISTRATION_LAST_NAME:
    return {
      ...state,
      lastName: action.lastName,
    };
  case loginConstants.SET_REGISTRATION_PASSWORD:
    return {
      ...state,
      password: action.password,
    };
  case loginConstants.SET_REGISTRATION_CONFIRM_PASSWORD:
    return {
      ...state,
      confirmPassword: action.confirmPassword,
    };
  case loginConstants.SET_REGISTRATION_IMAGE:
    return {
      ...state,
      image: action.image,
    };
  default:
    return state;
  }
};

export const login = combineReducers({
  authentication,
  formInput,
  registrationInput
});