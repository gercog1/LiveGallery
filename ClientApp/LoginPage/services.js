import axios from 'axios';
import FormData from "form-data";

export const loginService = {
  login: (email, password) => axios.post('/Account/Login',
    { Email: email, Password: password }),

  registration({ username, email, firstName, lastName, password, image }){
    const data = new FormData();
    data.append('UserName', username);
    data.append('Email', email);
    data.append('FirstName', firstName);
    data.append('LastName', lastName);
    data.append('Password', password);
    data.append('PhotoURL', image);
    return axios.post('/Account/Register', data, {
      headers: {
        dataType: 'json',
        processData: false,
        contentType: false,
      },
    });
  },

};