import axios from 'axios';

export const listServices = {
  getUsers(){
    return axios.get('/Account/GetAllUsers');
  },
};