import axios from "axios";

const API = axios.create({
    baseURL:`https://localhost:8080/API/V1/`
});

API.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("studyBuddy");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default API;

// --legacy-peer-deps