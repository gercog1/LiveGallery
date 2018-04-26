import { homeConstants} from "./constants";


const initialStateAllPosts = {
  isLoadedAllPosts: false,
  posts: []
};

export const allPosts = (state = initialStateAllPosts , action) => {
  switch (action.type) {
  case homeConstants.GET_ALL_POSTS_REQUEST:
    return {
      ...state,
    };
  case homeConstants.GET_ALL_POSTS_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoadedAllPosts: true,
    };
  case homeConstants.GET_ALL_POSTS_FAILURE:
    return {};
  default:
    return state;
  }
};
