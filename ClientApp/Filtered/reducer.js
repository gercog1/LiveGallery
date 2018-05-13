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
    };
  case filteredConstants.GET_FILTERED_PHOTOS_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoadedAllPosts: true,
    };
  case filteredConstants.GET_FILTERED_PHOTOS_FAILURE:
    return {};
  default:
    return state;
  }
};

const initialStateCountry = {
  isLoadedCountry: false,
  posts: []
};


export const allFilteredCountry = (state = initialStateCountry , action) => {
  switch (action.type) {
  case filteredConstants.GET_FILTERED_BY_COUNTRY_REQUEST:
    return {
      ...state,
    };
  case filteredConstants.GET_FILTERED_BY_COUNTRY_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isLoadedCountry: true,
    };
  case filteredConstants.GET_FILTERED_BY_COUNTRY_FAILURE:
    return {};
  default:
    return state;
  }
};
