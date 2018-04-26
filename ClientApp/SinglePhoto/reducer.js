import { singleConstants} from './constants';

const initialStatePostComments = {
  isLoadedPostComments: false,
  comments: [],
  comment: ''
};

export const postComments = (state = initialStatePostComments , action) => {
  switch (action.type) {
  case singleConstants.GET_POST_COMMENTS_REQUEST:
    return {
      ...state,
    };
  case singleConstants.GET_POST_COMMENTS_SUCCESS:
    return {
      ...state,
      comments: action.comments,
      isLoadedPostComments: true,
    };
  case singleConstants.SET_COMMENT_TEXT:
    return {
      ...state,
      comment: action.text,
    };
  case singleConstants.RESET_COMMENT_TEXT:
    return {
      ...state,
      comment: '',
    };
  case singleConstants.GET_POST_COMMENTS_FAILURE:
    return {};
  default:
    return state;
  }
};

const initialStateOnePost = {
  isLoadedOnePost: false,
  post: {}
};

export const onePhoto = (state = initialStateOnePost , action) => {
  switch (action.type) {
  case singleConstants.GET_ONE_POST_REQUEST:
    return {
      ...state,
    };
  case singleConstants.GET_ONE_POST_SUCCESS:
    return {
      ...state,
      post: action.post,
      isLoadedOnePost: true,
    };
  case singleConstants.GET_ONE_POST_FAILURE:
    return {};
  default:
    return state;
  }
};