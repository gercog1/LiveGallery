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
  deleteComment(commentId){
    return axios.post(`/Comment/DeleteComment?=${commentId}`, {

    });
  },
  getOnePost(postId){
    return axios.get(`/Post/GetPost?=${postId}`);
  },

};