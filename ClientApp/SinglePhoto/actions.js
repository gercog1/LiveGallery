import { singleConstants} from './constants';
import { singleServices} from './services';
import {globalService} from "../services";

import swal from 'sweetalert';

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

const getOnePost = (id) => {
  function request() { return { type: singleConstants.GET_ONE_POST_REQUEST }; }
  function success(post) { return { type: singleConstants.GET_ONE_POST_SUCCESS, post }; }
  function failure(error) { return { type: singleConstants.GET_ONE_POST_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    singleServices.getOnePost(id)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

const setLike = (postId, userId) => (dispatch) => {
  globalService.setLike(postId, userId)
    .then(response => {
      dispatch(getOnePost(postId));

    })
    .catch(error => {

    });
};

const addComment = (postId) => (dispatch, getState) => {
  const { postComments: { comment }} = getState();
  singleServices.addComment(postId, localStorage.getItem('id'), comment)
    .then(response => {
      dispatch(getComments(postId));
      dispatch(resetInput());
    })
    .catch(error => {
      swal(error.message, '', 'error');
    });
};

const deleteComment = (commentId, postId) => (dispatch) => {
  singleServices.deleteComment(commentId)
    .then(response => {
      dispatch(getComments(postId));
      dispatch(resetInput());
    })
    .catch(error => {
      swal(error.message, '', 'error');
    });
};

const setCommentText = text => ({ type: singleConstants.SET_COMMENT_TEXT, text });
const resetInput = () => ({ type: singleConstants.RESET_COMMENT_TEXT });

const actions = {
  getComments,
  getOnePost,
  setLike,
  addComment,
  setCommentText,
  resetInput,
  deleteComment,
};

export default actions;
