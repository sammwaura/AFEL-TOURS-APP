import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const checkAvailability = async (room, checkIn, checkOut) => {
    const res = await axios.get(`${API_URL}/bookings/availability` , {
        params: { room, checkIn, checkOut }, 
    })
    return res.data.available
}

export const createBooking = async (bookingData) => {
        const res = await axios.post(`${API_URL}/bookings`, bookingData)
        return res.data
}