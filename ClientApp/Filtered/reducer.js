import { filteredConstants } from "./constants";

const initialStateFilteredPosts = {
  isLoadedAllPosts: false,
  posts: []
};

export const allFilteredPhotos = (state = initialStateFilteredPosts , action) => {
  switch (action.type) {
  case filteredConstants.GET_FILTERED_PHOTOS_REQUEST:
    return {
      ...state,
        isLoadedAllPosts: false
    };
  case filteredConstants.GET_FILTERED_PHOTOS_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoadedAllPosts: true,
    };
  case filteredConstants.GET_FILTERED_PHOTOS_FAILURE:
    return {};
  case filteredConstants.CLEAR_FILTER_PHOTOS:
    return initialStateFilteredPosts;
  case filteredConstants.GET_FILTERED_BY_COUNTRY_REQUEST:
    return {
      ...state,
        isLoadedAllPosts: false
    };
  case filteredConstants.GET_FILTERED_BY_COUNTRY_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoadedAllPosts: true,
    };
  case filteredConstants.GET_FILTERED_BY_COUNTRY_FAILURE:
    return {};
  default:
    return state;
  }
};


export const allFilteredCountry = (state= {} , action) => {
  switch (action.type) {

  default:
    return state;
  }
};
