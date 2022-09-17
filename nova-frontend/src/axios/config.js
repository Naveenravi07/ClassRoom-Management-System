import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:1080'
});

export default instance