import axios from 'axios';

export const loginService = {
  login: (email, password) => axios.post('http://localhost:5000/Account/Login',
    email, password),
};