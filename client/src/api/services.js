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

export const createService = async (serviceData) => {
  const res = await axios.post(`${API_URL}/services`, serviceData)
  return res.data
}

export const updateService = async (id, serviceData) => {
  const res = await axios.put(`${API_URL}/services/${id}`, serviceData)
  return res.data
}

export const deleteService = async (id) => {
  const res = await axios.delete(`${API_URL}/services/${id}`)
  return res.data
}

export const getServiceById = async (id) => {
  const res = await axios.get(`${API_URL}/services`)
  return (res.data.data || []).find((s) => s._id === id)
}
