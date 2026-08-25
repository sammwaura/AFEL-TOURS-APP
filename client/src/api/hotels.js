import axios from "axios";

const API_URL =  import.meta.env.VITE_API_URL

export const getAllHotels = async () => {
    const res =  await axios.get(`${API_URL}/hotels`);
    return res.data.data || []
}

export const searchHotels = async ({ name, city }) => {
    const params = new URLSearchParams()
    if(name) params.append('name', name)
        if(city) params.append('city', city)

            const res =  await axios.get(
                `${API_URL}/hotels/search/getHotelsBySearch?${params.toString()}`
            )
             return res.data.data || []
}

export const getSingleHotel = async (id ) => {
    const res =  await axios.get(`${API_URL}/hotels/${id}`);
    return res.data.data || {}
}

export const getFeaturedHotels = async () => {
    const res = await axios.get(`${API_URL}/hotels`)
    return (res.data.data || []).slice(0, 4)
}


export const createHotel = async (hotelData) => {
    const res = await axios.post(`${API_URL}/hotels`, hotelData)
    return res.data
}

export const updateHotel = async (id, hotelData) => {
    const res = await axios.put(`${API_URL}/hotels/${id}`, hotelData)
    return res.data
}

export const deleteHotel = async (id) => {
  const res = await axios.delete(`${API_URL}/hotels/${id}`)
  return res.data
}