import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const uploadPhotos = async (files) => {
  const formData = new FormData()
  for (const file of files) {
    formData.append('photos', file)
  }

  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.data || []
}