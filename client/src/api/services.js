import axios from 'axios'


const API_URL = import.meta.env.VITE_API_URL

export const getAllServices = async () => {
    const res = await axios.get(`${API_URL}/services`)
    return res.data.data || []
}

export const getServiceBySlug = async (slug) => {
    const res = await axios.get(`${API_URL}/services/slug/${slug}`)
    return res.data.data 
}

