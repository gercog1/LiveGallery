import axios from 'axios';


export const loginService = {
  login: (email, password) => axios.post('http://localhost:59523/Account/Login',
      { Email: email, Password: password }),
};