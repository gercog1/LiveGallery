import axios from 'axios';
import FormData from 'form-data';

export const userService = {
  addPhoto(description, file){
    const data = new FormData();
    data.append('UserID', localStorage.getItem('id'));
    data.append('Description', description);
    data.append('File', file);
    return axios.post('/', data, {
      headers: {
        dataType: 'json',
        processData: false,
        contentType: false,
      },
    });
  },
};

