import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

if(process.env.VUE_APP_API_KEY) {
    instance.interceptors.request.use((config) => {
        config.params = config.params ?? {};
        config.params.api_key = process.env.VUE_APP_API_KEY;
        return config;
    });
}

export default instance;