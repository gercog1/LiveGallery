import {filteredService} from "./service";
import {filteredConstants} from "./constants";

export const getFilteredPhotos = category => {
  function request() { return { type: filteredConstants.GET_FILTERED_PHOTOS_REQUEST }; }
  function success(posts) { return { type: filteredConstants.GET_FILTERED_PHOTOS_SUCCESS, posts }; }
  function failure(error) { return { type: filteredConstants.GET_FILTERED_PHOTOS_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    filteredService.getFilteredPhotos(category)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
} ;


export const getFilteredByCountryPhotos = country => {
  function request() { return { type: filteredConstants.GET_FILTERED_BY_COUNTRY_REQUEST }; }
  function success(posts) { return { type: filteredConstants.GET_FILTERED_BY_COUNTRY_SUCCESS, posts }; }
  function failure(error) { return { type: filteredConstants.GET_FILTERED_BY_COUNTRY_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    filteredService.getFilterByCountry(country)
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
} ;

export const clearFilterPhotos = () => ({ type: filteredConstants.CLEAR_FILTER_PHOTOS });