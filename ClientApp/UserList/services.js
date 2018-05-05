import axios from 'axios';

export const listServices = {
  getUsers(){
    return axios.get('/Account/GetAllUsers');
  },
  subscribe(yourId, userId){
    return axios.post(`/Account/Subscribe`, {
      UserId: yourId,
      SubscriberId: userId,
    });
  }
};