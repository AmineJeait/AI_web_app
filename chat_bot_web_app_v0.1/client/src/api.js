import axios from "axios";

const VITE_API_URL = "http://127.0.0.1:5000"

const api = axios.create({
    baseURL:VITE_API_URL 
})



export default api;


// import axios from "axios"
// import { ACCES_TOKEN } from "./constants"

// ;


// const api = axios.create({
//     baseURL:import.meta.env.VITE_API_URL            //import env variables
// })


// api.interceptors.request.use(
//     (config) =>{
//         const token = localStorage.getItem(ACCES_TOKEN);
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) =>{
//         return Promise.reject(error);
//     }
// )


// export default api;