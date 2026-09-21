import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getAllItineraries = async () => {
  const res = await axios.get(`${API_URL}/itineraries`)
  return res.data.data || []
}

export const getItinerariesByService = async (serviceId) => {
  const res = await axios.get(`${API_URL}/itineraries/service/${serviceId}`)
  return res.data.data || []
}

export const getSingleItinerary = async (id) => {
  const res = await axios.get(`${API_URL}/itineraries/${id}`)
  return res.data.data
}

export const createItinerary = async (itineraryData) => {
  const res = await axios.post(`${API_URL}/itineraries`, itineraryData)
  return res.data
}

export const updateItinerary = async (id, itineraryData) => {
  const res = await axios.put(`${API_URL}/itineraries/${id}`, itineraryData)
  return res.data
}

export const deleteItinerary = async (id) => {
  const res = await axios.delete(`${API_URL}/itineraries/${id}`)
  return res.data
}