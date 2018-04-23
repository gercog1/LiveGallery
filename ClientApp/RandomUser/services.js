import axios from 'axios';


export const randomService = {
  getProfilePosts(id){
    return axios.get(`/Post/GetUserPosts?userID=${id}`);
  },
  getUser(id){
      return axios.get(`/Account/GetUser?userID=${id}`);
  }
};


