import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { getUserBookings } from '../api/bookings'

const statusStyles = {
    pending: 'text-brass border-brass',
    confirmed: 'text-moss border-moss',
    cancelled: 'text-red-700 border-red-700'
}

function MyInquiries() {
    const { user } = useUser()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] =  useState(true)


    useEffect(() => {
                    if (!user) return
                    getUserBookings(user.id)
                        .then(setBookings)
                        .catch((err) => console.error('Failed to load Inquiries:', err))
                        .finally(() => setLoading(false))
                }, [user])


            const formatDate = (dateStr) =>
                new Date(dateStr).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
     })

        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <p className="font-mono text-xs uppercase trackng-widest text-brass mb-2">Your Requests</p>
                <h1 className="font-display text-4xl text-ink mb-8">My Inquiries</h1>

                {loading ? (
                    <p className="font-mono text-sm text-charcoal/60">Loading...</p>
                ) : bookings.length === 0 ? (
                    <div className="border border-line p-10 text-center">
                        <p className="font-display text-xl text-ink mb-2">No Inquiries yet</p>
                        <p className="font-mono text-sm text-charcoal/60 mb-6">Browse our hotels and submit a request to book.</p>
                        <Link to="/hotels" className="inline-block bg-brass text-ink font-mono text-sm uppercase tracking-wide px-6 py-3 hover:bg-ink hover:text-brass transition-colors">
                                Browse Hotels
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="border border-line bg-white p-5">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                    <div>
                                        <p className="font-mono text-xs uppercase tracking-wide text-moss mb-1">
                                            {booking.hotel?.name}
                                        </p>
                                        <h3 className="font-display text-xl text-ink">
                                            {booking.room?.roomType || 'Room type unavailable'}
                                        </h3>
                                    </div>

                                    <span className={`self-start font-mono text-xs uppercase tracking-wide border px-3 py-1 ${ statusStyles
                                                    [booking.status] || 'text-charcoal border-line'}`}>
                                                        {booking.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-sm border-t border-line pt-3">
                                    <div>
                                        <p className="text-xs text-charcoal/50 uppercase mb-1">Check-in</p>
                                        <p className="text-ink">{formatDate(booking.checkIn)}</p>
                                    </div>
                                <div>
                                <p className="text-xs text-charcoal/50 uppercase mb-1">Check-out</p>
                                <p className="text-ink">{formatDate(booking.checkOut)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-charcoal/50 uppercase mb-1">Guests</p>
                                    <p className="text-ink">{formatDate(booking.guests)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-charcoal/50 uppercase mb-1">Kids</p>
                                    <p className="text-ink">
                                        {booking.hasKids ? `${booking.kidsAges?.length || 0} (${booking.kidsAges?.join(', ')})`
                                        : 'None'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 border-t border-line flex items-baseline justify-between ">
                                <span className="font-mono text-xs text-charcoal/50">Estimated Total</span>
                                <span className="font-mono text-base text-ink">KES {booking.totalPrice?.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}



export default MyInquiries