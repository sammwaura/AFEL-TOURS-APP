export const getAllServiceInquiries = async (authedClient) => {
  const res = await authedClient.get('/service-inquiries')
  return res.data.data || []
}

export const updateServiceInquiryStatus = async (authedClient, id, status) => {
  const res = await authedClient.put(`/service-inquiries/${id}/status`, { status })
  return res.data
}