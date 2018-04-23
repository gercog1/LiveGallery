import axios from 'axios';

export const globalService = {
  setLike(postId, userId){
    return axios.post('/Post/SetLike',{
      PostID: postId,
      UserID: userId,
    });
  },
};