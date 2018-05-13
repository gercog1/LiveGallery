import axios from 'axios';
import FormData from "form-data";


export const randomService = {
  getProfilePosts(id){
    return axios.get(`/Post/GetUserPosts?userID=${id}`);
  },
  getUser(id){
    return axios.get(`/Account/GetUser?userID=${id}`);
  },
  addPhoto(description, file, category){
    const data = new FormData();
    data.append('UserID', localStorage.getItem('id'));
    data.append('Description', description);
    data.append('File', file);
    data.append('Category', category);
    return axios.post('/Post/CreatePost', data, {
      headers: {
        dataType: 'json',
        processData: false,
        contentType: false,
      },
    });
  },
  deletePhoto(postId){
    return axios.get(`/Post/DeletePost?=${postId}`);
  },
  getFollowers(id){
    return axios.get(`/Account/GetSubscribers?=${id}`, {});
  },
  getFollowing(id){
    return axios.get(`/Account/GetSubscriptions?=${id}`, {});
  },
};


