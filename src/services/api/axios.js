import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://harmonyhavenappserver.erdemserhat.com/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'harmonyhavenapikey': 'harmonyhavenapikeyK12yW8CBSoBfy41Cu6b3UDbMfEjijD0cKp4K166z29CADrYT4nRtOolZlOxGaOL5X7wmXY9fqyiFRvLeCB2OYS6J9x5zYbtSuiqsieelAD2lo9'
    }
})

// Request interceptor - token ekleme
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor ekleyelim
instance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
        }
        return Promise.reject(error);
    }
);

export default instance 