import axios from 'axios';

export const homeService ={
    getAllPosts(){
        return axios.get('/Post/GetAllPosts');
    },
};