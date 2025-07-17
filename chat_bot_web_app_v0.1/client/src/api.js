import axios from "axios";

const VITE_API_URL = "http://127.0.0.1:5000"

const api = axios.create({
    baseURL:VITE_API_URL 
})



export default api;