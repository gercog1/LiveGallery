import axios from 'axios';

export const filteredService = {
  getFilteredPhotos(category){
    return axios.get(`/Post/GetPostsByCategory?=${category}`);
  },
    getFilterByCountry(country){
      return axios.get(`/Post/GetByCountry?=${country}`);
    }
};