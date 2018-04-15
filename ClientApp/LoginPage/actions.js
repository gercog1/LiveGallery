import { loginConstants } from './constants';
import { loginService} from './services';

export const login = (username, password) => {
  function request() { return { type: loginConstants.LOGIN_REQUEST}; }
  function success() { return { type: loginConstants.LOGIN_SUCCESS }; }
  function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error }; }

  return dispatch => {
    dispatch(request({ username }));

    loginService.login(username, password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        dispatch(failure(error));

      });
  };
};

