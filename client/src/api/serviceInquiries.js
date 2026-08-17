import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const createServiceInquiry = async (inquiryData) => {
    const res = await axios.post(`${API_URL}/service-inquires`, inquiryData)
    return res.data
}

export const getUserServiceInquiries = async (userId) => {
    const res = await axios.get(`${API_URL}/service-inquiries/user/${userId}`)
    return res.data.data || []
}