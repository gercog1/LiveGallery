import { loginConstants } from './constants';
import { loginService } from './services';


export const login = (username, password) => {
  function request() { return { type: loginConstants.LOGIN_REQUEST }; }
  function success() { return { type: loginConstants.LOGIN_SUCCESS }; }
  function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error }; }

  return (dispatch, getState) => {
    const { login: { formInput: { email, password } } } = getState();
    dispatch(request());

    loginService.login(email, password)
      .then(response => {
        console.log(response);

      })
      .catch(error => {
        dispatch(failure(error));

      });
  };
};


export const setEmail = email => ({ type: loginConstants.SET_EMAIL, email });
export const setPassword = password => ({ type: loginConstants.SET_PASSWORD, password });


export const setRegUsername = username => ({ type: loginConstants.SET_REGISTRATION_USERNAME, username });
export const setRegFirstName = firstName => ({ type: loginConstants.SET_REGISTRATION_FIRST_NAME, firstName });
export const setRegLastName = lastName => ({ type: loginConstants.SET_REGISTRATION_LAST_NAME, lastName });
export const setRegEmail = email => ({ type: loginConstants.SET_REGISTRATION_EMAIL, email });
export const setRegPassword = password => ({ type: loginConstants.SET_REGISTRATION_PASSWORD, password });
export const setRegConfirmPassword = confirmPassword => ({ type: loginConstants.SET_REGISTRATION_CONFIRM_PASSWORD, confirmPassword  });
export const setRegImage = image => ({ type: loginConstants.SET_REGISTRATION_IMAGE, image });


export const register = () => (dispatch, getState) => {
  const { login : { registrationInput: { username, email, firstName, lastName, password, image, confirmPassword } } } = getState();
  if(password === confirmPassword){
    loginService.registration({username, email, firstName, lastName, password, image })
      .then(response => {
        console.log(response);

      })
      .catch(error => {


      });
  }
  console.log('aaaa');


};
