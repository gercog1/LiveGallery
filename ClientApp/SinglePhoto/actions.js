import { singleConstants} from './constants';
import { singleServices} from './services';

const getComments = (id) => {
  function request() { return { type: singleConstants.GET_POST_COMMENTS_REQUEST }; }
  function success(comments) { return { type: singleConstants.GET_POST_COMMENTS_SUCCESS, comments }; }
  function failure(error) { return { type: singleConstants.GET_POST_COMMENTS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    singleServices.getPhotoComments(id)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

const actions = {
    getComments,
};

export default actions;
