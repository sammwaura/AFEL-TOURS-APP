import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { createAuthedClient } from '../../api/axiosClient'
import { getAllServiceInquiries, updateServiceInquiryStatus } from '../../api/adminServiceInquiries'

const statusStyles = {
  pending: 'bg-brass/10 text-brass',
  confirmed: 'bg-moss/10 text-moss',
  cancelled: 'bg-red-100 text-red-700',
}

function AdminInquiries() {
  const { getToken } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [filter, setFilter] = useState('all')

  const loadInquiries = async () => {
    setLoading(true)
    try {
      const client = createAuthedClient(getToken)
      const data = await getAllServiceInquiries(client)
      setInquiries(data)
    } catch (err) {
      console.error('Failed to load inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInquiries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      const client = createAuthedClient(getToken)
      await updateServiceInquiryStatus(client, id, status)
      setInquiries((prev) =>
        prev.map((i) => (i._id === id ? { ...i, status } : i))
      )
    } catch (err) {
      console.error('Failed to update inquiry:', err)
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const filteredInquiries =
    filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-charcoal mb-1">
          Service Inquiries
        </h1>
        <p className="text-charcoal/60">
          Safaris, hikes, conferences, group trips, honeymoons &amp; family getaways
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full border transition-colors ${
              filter === f
                ? 'bg-charcoal text-white border-charcoal'
                : 'border-line text-charcoal/60 hover:border-charcoal'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="font-display text-sm text-charcoal/60">Loading…</p>
      ) : filteredInquiries.length === 0 ? (
        <div className="border border-line rounded-xl p-10 text-center bg-white">
          <p className="font-display text-charcoal/60">No inquiries found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white border border-line rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <p className="font-display text-xs uppercase tracking-wide text-moss mb-1">
                    {inquiry.service?.name || 'Service unavailable'}
                  </p>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    {inquiry.destination || 'No destination specified'}
                  </h3>
                  <p className="text-sm text-charcoal/60 mt-1">
                    {inquiry.userEmail} {inquiry.userPhone && `• ${inquiry.userPhone}`}
                  </p>
                </div>

                <span
                  className={`self-start font-display text-xs uppercase tracking-wide px-3 py-1 rounded-full ${
                    statusStyles[inquiry.status] || 'bg-line text-charcoal'
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-t border-line pt-3 mb-3">
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Start Date</p>
                  <p className="text-charcoal">{formatDate(inquiry.preferredStartDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">End Date</p>
                  <p className="text-charcoal">{formatDate(inquiry.preferredEndDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Group Size</p>
                  <p className="text-charcoal">{inquiry.groupSize}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Budget</p>
                  <p className="text-charcoal">{inquiry.budgetRange || '—'}</p>
                </div>
              </div>

              {inquiry.notes && (
                <div className="border-t border-line pt-3 mb-3">
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Notes</p>
                  <p className="text-sm text-charcoal/80">{inquiry.notes}</p>
                </div>
              )}

              {inquiry.status === 'pending' && (
                <div className="flex justify-end gap-2 border-t border-line pt-3">
                  <button
                    onClick={() => handleStatusChange(inquiry._id, 'confirmed')}
                    disabled={updatingId === inquiry._id}
                    className="bg-moss text-white font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-40"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(inquiry._id, 'cancelled')}
                    disabled={updatingId === inquiry._id}
                    className="bg-red-600 text-white font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-40"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminInquiries