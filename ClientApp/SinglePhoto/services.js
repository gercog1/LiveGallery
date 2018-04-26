import axios from 'axios';

export const singleServices = {
  getPhotoComments(postID){
    return axios.get(`/Comment/GetCommentsForPost?=${postID}`);
  },
  addComment(postId, userId, text){
    return axios.post(`/Comment/CreateComment`, {
      UserId: userId,
      PostId: postId,
      Text: text,
    });
  },
  getOnePost(postId){
    return axios.get(`/Post/GetPost?=${postId}`);
  },

};