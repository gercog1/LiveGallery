import { listConstants } from "./constants";
import { listServices } from './services';

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
  listServices.subscribe(localStorage.getItem('id', userId))
    .then(response => {
      swal('You subscribe on :)', '', 'success');
    })
    .catch(error => {
      swal(error.message, '', 'error');
    });
};

const actions = {
  getUsers,
  subscribe,
};

export default actions;
