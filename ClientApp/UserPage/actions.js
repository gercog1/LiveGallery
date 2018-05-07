import swal from 'sweetalert';

import { userConstants } from './constants';
import { randomService} from "../RandomUser/services";


const getUserProfile = (id) => {
  function request() { return { type: userConstants.GET_USER_PROFILE_REQUEST }; }
  function success(user) { return { type: userConstants.GET_USER_PROFILE_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.GET_USER_PROFILE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    randomService.getUser(id)
      .then(response => {
        dispatch(success(response.data));

      })
      .catch(error => {
        dispatch(failure(error));

      });
  };
};


const actions = {
    getUserProfile,
};

export default actions;