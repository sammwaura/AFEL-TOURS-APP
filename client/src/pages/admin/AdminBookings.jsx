import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { createAuthedClient } from '../../api/axiosClient'
import { getAllBookings, updateBookingStatus } from '../../api/adminBookings'

const statusStyles = {
  pending: 'bg-brass/10 text-brass',
  confirmed: 'bg-moss/10 text-moss',
  cancelled: 'bg-red-100 text-red-700',
}

function AdminBookings() {
  const { getToken } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [filter, setFilter] = useState('all')

  const loadBookings = async () => {
    setLoading(true)
    try {
      const client = createAuthedClient(getToken)
      const data = await getAllBookings(client)
      setBookings(data)
    } catch (err) {
      console.error('Failed to load bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    try {
      const client = createAuthedClient(getToken)
      await updateBookingStatus(client, id, status)
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      )
    } catch (err) {
      console.error('Failed to update booking:', err)
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

  const filteredBookings =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-charcoal mb-1">
          Hotel Bookings
        </h1>
        <p className="text-charcoal/60">Review and manage incoming requests</p>
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
      ) : filteredBookings.length === 0 ? (
        <div className="border border-line rounded-xl p-10 text-center bg-white">
          <p className="font-display text-charcoal/60">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white border border-line rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <p className="font-display text-xs uppercase tracking-wide text-moss mb-1">
                    {booking.hotel?.name}
                  </p>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    {booking.room?.roomType || 'Room unavailable'}
                  </h3>
                  <p className="text-sm text-charcoal/60 mt-1">{booking.userEmail}</p>
                </div>

                <span
                  className={`self-start font-display text-xs uppercase tracking-wide px-3 py-1 rounded-full ${
                    statusStyles[booking.status] || 'bg-line text-charcoal'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm border-t border-line pt-3 mb-4">
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Check-in</p>
                  <p className="text-charcoal">{formatDate(booking.checkIn)}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Check-out</p>
                  <p className="text-charcoal">{formatDate(booking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Guests</p>
                  <p className="text-charcoal">{booking.guests}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase mb-1">Kids</p>
                  <p className="text-charcoal">
                    {booking.hasKids ? booking.kidsAges?.join(', ') : 'None'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-3">
                <span className="font-display text-sm text-charcoal">
                  Est. Total: KES {booking.totalPrice?.toLocaleString()}
                </span>

                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(booking._id, 'confirmed')}
                      disabled={updatingId === booking._id}
                      className="bg-moss text-white font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-40"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking._id, 'cancelled')}
                      disabled={updatingId === booking._id}
                      className="bg-red-600 text-white font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-40"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminBookings