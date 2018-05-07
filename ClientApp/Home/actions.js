import { homeConstants} from "./constants";
import { homeService} from "./services";
import { globalService} from "../services";
import swal from "sweetalert";
import {randomService} from "../RandomUser/services";

export const getAllPosts = () => {
  function request() { return { type: homeConstants.GET_ALL_POSTS_REQUEST }; }
  function success(posts) { return { type: homeConstants.GET_ALL_POSTS_SUCCESS, posts }; }
  function failure(error) { return { type: homeConstants.GET_ALL_POSTS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    let func;
    if(localStorage.getItem('role') == 1){
        func = homeService.getEveryPost;
    }
    else {
        func = homeService.getAllPosts;
    }

      func()
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

export const setLike = (postId, userId) => (dispatch) => {
  globalService.setLike(postId, userId)
    .then(response => {
      dispatch(getAllPosts());

    })
    .catch(error => {

    });
};


export const deletePost = (postId) => (dispatch) => {
    randomService.deletePhoto(postId)
        .then(response => {
            dispatch(getAllPosts());

        })
        .catch(error => {
            swal(error.message, '', 'error');
        });
};