import axios from 'axios';


export const loginService = {
  login: (email, password) => axios.post('/Account/Login',
      { Email: email, Password: password }),
};