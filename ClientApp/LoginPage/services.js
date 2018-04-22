import axios from 'axios';


export const loginService = {
  login: (email, password) => axios.post('/Account/Login',
    { Email: email, Password: password }),
  registration: ({ username, email, firstName, lastName, password, image }) => axios.post('/Account/Register',
    {
      UserName: username,
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      Password: password,
      PhotoURL: image,
    }),

};