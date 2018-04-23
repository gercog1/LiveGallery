import { singleConstants} from './constants';

const initialStatePostComments = {
  isLoadedPostComments: false,
  comments: []
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
      comments: action.posts,
      isLoadedPostComments: true,
    };
  case singleConstants.GET_POST_COMMENTS_FAILURE:
    return {};
  default:
    return state;
  }
};