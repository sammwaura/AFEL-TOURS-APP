import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getFeaturedRooms = async () => {
    const res = await axios.get(`${API_URL}/rooms/search/getFeaturedRooms`)
    return res.data.data
}   

export const searchRooms = async({ city, maxGuests, minPrice, maxPrice}) => {
    const params = new URLSearchParams()
    if (city) params.append('city', city)
    if (maxGuests) params.append('maxGuests', maxGuests)
    if (minPrice) params.append('minPrice', minPrice)
    if (maxPrice) params.append('maxPrice', maxPrice)

    const res = await axios.get(
        `${API_URL}/rooms/search/getRoomsBySearch?${params.toString()}`
    )
    return res.data.data || []
}

export const getSingleRoom = async (id) => {
    const res = await axios.get(`${API_URL}/rooms/${id}`)
    return res.data.data
}

export const getRoomsByHotel =  async (hotelId) => {
    const res = await axios.get(`${API_URL}/rooms/hotel/${hotelId}`)
    return res.data.data || []
}

export const createRoom = async (roomData) => {
    const res = await axios.post(`${API_URL}/rooms`, roomData)
    return res.data
}

export const updateRoom = async (id, roomData) => {
    const res = await axios.post(`${API_URL}/rooms/${id}`, roomData)
    return res.data
}

export const deleteRoom = async (id) => {
    const res = await axios.post(`${API_URL}/rooms/${id}`)
    return res.data
}

