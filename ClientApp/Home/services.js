import axios from 'axios';

export const homeService ={
    getAllPosts() {
        return axios.get(`/Post/GetPostsBySubscribers?=${localStorage.getItem('id')}`);
    },
    getEveryPost(){
        return axios.get('/Post/GetAllPosts')
    }
};