import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL


export const createAuthedClient = (getToken) => {
    const client = axios.create({ baseURL: API_URL })


    client.interceptors.request.use(async (config) => {
        const token = await getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    return config
})

return client

}