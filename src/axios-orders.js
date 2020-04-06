import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-31e43.firebaseio.com/'
})

export default instance;