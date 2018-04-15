import { loginConstants } from './constants';

const initialState = {
  id: ''
};

export function authentication(state = initialState , action) {
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
}