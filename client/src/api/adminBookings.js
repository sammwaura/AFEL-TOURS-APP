export const getAllBookings = async (authedClient) => {
  const res = await authedClient.get('/bookings')
  return res.data.data || []
}

export const updateBookingStatus = async (authedClient, id, status) => {
  const res = await authedClient.put(`/bookings/${id}/status`, { status })
  return res.data
}