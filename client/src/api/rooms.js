import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getFeaturedRooms = async () => {
    const res = await axios.get(`${API_URL}/rooms/search/getFeaturedRooms`)
    return res.data.data
}

export const getSingleRoom = async (id) => {
    const res = awaitaxios.get(`${API_URL}/rooms/${id}`)
    return res.data.data
}