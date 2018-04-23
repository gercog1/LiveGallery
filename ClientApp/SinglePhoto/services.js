import axios from 'axios';

export const singleServices = {
  getPhotoComments(postID){
    return axios.get(`/Comment/GetCommentsForPost?=postID`);
  },
  addComment(userId, postId, text){
    return axios.post('', {
      UserId: userId,
      PostId: postId,
      Text: text,
    });
  }
};