import { listConstants } from "./constants";
import { listServices } from './services';
import userActions from '../UserPage/actions';

import swal from "sweetalert";

const getUsers = () => {
  function request() { return { type: listConstants.GET_USERS_REQUEST }; }
  function success(users) { return { type: listConstants.GET_USERS_SUCCESS, users }; }
  function failure(error) { return { type: listConstants.GET_USERS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    listServices.getUsers()
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

const subscribe = (userId) => (dispatch) => {
  listServices.subscribe(localStorage.getItem('id'), userId)
    .then(response => {
      dispatch(getUsers());
      dispatch(userActions.getUserProfile(localStorage.getItem('id')));
    })
    .catch(error => {
      swal(error.message, '', 'error');
    });
};

const deleteUser = userId => dispatch => {
  listServices.deleteUser(userId)
    .then(response => {
      dispatch(getUsers());
    })
    .catch(error => {
      swal(error.message, '', 'error');
    });
};

const actions = {
  getUsers,
  subscribe,
    deleteUser,
};

export default actions;
