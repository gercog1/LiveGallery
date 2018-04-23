import { listConstants } from "./constants";
import { listServices } from './services';

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

const actions = {
  getUsers,
};

export default actions;
