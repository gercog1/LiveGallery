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

