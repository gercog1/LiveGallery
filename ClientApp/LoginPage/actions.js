import { loginConstants } from './constants';
import { loginService } from './services';
import swal from 'sweetalert';

export const login = (username, password) => {
  function request() { return { type: loginConstants.LOGIN_REQUEST }; }
  function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error }; }

  return (dispatch, getState) => {
    const { login: { formInput: { email, password } } } = getState();
    dispatch(request());

    loginService.login(email, password)
      .then(response => {
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('username', response.data.userName);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
        swal(error.data.message, '', 'error');
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
        dispatch(resetForm());
        swal('success','','success');
      })
      .catch(error => {
        swal(error.message,'','success');

      });
  }
  else {
    swal('Password confirmation isn`t correct!', '', 'error');
  }
};

export const logout = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('username');
  localStorage.removeItem('firstName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('email');
  localStorage.removeItem('lastName');
  return { type: loginConstants.LOG_OUT };
};

export const resetForm = () => ({ type: loginConstants.RESET_REGISTRATION_FORM });
