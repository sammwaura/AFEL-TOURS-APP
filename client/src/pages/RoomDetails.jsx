import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser, SignInButton } from '@clerk/clerk-react'
import { getSingleRoom } from '../api/rooms'
import {checkAvailability, createBooking } from '../api/bookings'
import PhotoGallery from '../components/PhotoGallery'

function RoomDetails () {
    const { id } = useParams()
    const { isSignedIn, user } = useUser()

    const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(true)

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)

    const [availability, setAvailability] = useState(null)  //null | true | false 
    const [checkingAvailability, setCheckingAvailability] = useState(false)
    const [booking, setBooking] = useState(false)
    const [bookingResult, setBookingResult] = useState(null) //'success' | 'error' | null


    useEffect(() => {
         getSingleRoom(id)
         .then(setRoom)
         .catch((err) => console.error('Failed to load room'))
         .finally(() => setLoading(false))
    }, [id])


    const nights = 
        checkIn && checkOut
            ? Math.max(
                0,
                Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
             )
        : 0

    const  totalPrice = room ? nights * room.pricePerNight : 0

    const handleCheckAvailability = async () => {
        if(!checkIn || !checkOut) return 
        setCheckingAvailability(true)
        setAvailability(null)
        try {
            const available = await checkAvailability(id, checkIn, checkOut)
            setAvailability(available)
        } catch (err){
            console.error('Availability check failed:', err)
        } finally {
            setCheckingAvailability(false)
        }
    }


    const handleBook = async () => {
        setBooking(true)
        setBookingResult(null)
        try{
            await createBooking({
                room:id,
                userId: user.id,
                userEmail: user.primaryEmailAddress?.emailAddress,
                checkIn,
                checkOut,
                guests,
            })
            setBookingResult('success')
            setAvailability(false) //room is now booked for this dates
        } catch (err){
            console.log('Booking Failed:', err)
        } finally {
            setBooking(false)
        }
    }


    if(loading){
        return(
            <div className="max-w-6xl mx-auto px-6 py-16">
                <p className="font-mono text-sm text-charcoal/60">Loading room...</p>
            </div>
        )
    }

    return(
        <div className="max-w-6xl mx-auto px-6 py-12">
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
                {room.hotel?.city}
            </p>
            <h1 className="font-display text-4xl text-ink mb-1">
                {room.roomType}
            </h1>
            <p className="text-charcoal/70 mb-8">{room.hotel?.name} - {room.hotel?.address}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left; gallery + details */}
                <div className="lg:col-span-2">
                    <PhotoGallery photos={room.photos} />

                    <div className="mt-8 border-t border-line pt-6">
                        <h2 className="font-display text-2xl text-ink mb-3">About this room</h2>
                        <p className="text-charocoal/80 leading-relaxed mb-6">
                        {room.hotel?.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {room.amenities?.map((amenity) => {
                                <span
                                    key={amenity}
                                    className='font-mono text-xs uppercase tracking-wide border border-line px-3 py-1.5 text-moss'
                                >
                                    {amenity}
                                </span>
                            })}
                        </div>

                        <p className="font-mono text-sm text-charcoal/60 mt-4">
                            Sleeps up to {room.maxGuests} guests
                        </p>
                    </div>
                </div>

                {/* Right: booking card */}
                <div>
                    <div className="border-2 border-brass p-6 sticky top-6">
                        <div className="flex items-baseline gap-1 mb-6 border-b border-line pb-4">
                            <span className="font-mono text-2xl text-ink">
                                KES {room.pricePerNight?.toLocaleString()}
                            </span>
                            <span className="font-mono text-sm text-charcoal/60">/ night</span>
                        </div>

                        <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">
                            Check-In
                        </label>
                        <input type="date" value={checkIn} onChange={(e) => {
                            setCheckIn(e.target.value); 
                            setAvailability(null);
                            setBookingResult(null)
                        }}
                        className='w-full border border-line px-3 py-2 mb-4 font-mono text-sm outline-none focus:border-brass' />

                        <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">
                            Check-out
                        </label>
                        <input type="date" value={checkOut} onChange={(e) => {
                            setCheckOut(e.target.value);
                            setAvailability(null);
                            setBookingResult(null)
                        }}
                        className='w-full border border-line px-3 py-2 mb-4 font-mono text-sm outline-none focus:border-brass' />

                        <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">Guests</label>
                        <input type="number" min= "1" max={room.maxGuests} value={guests} onChange={(e) => setGuests(Number,(e.target.value))}
                        className='w-full border border-line px-3 py-2 mb-4 font-mono outline-none focus:border-brass'/>

                        {nights > 0 && (
                            <div className="font-mono text-sm text-charcoal/70 mb-4 border-t border-line pt-3">
                                <div className="flex justify-between mb-1">
                                    <span>{nights} night{nights !== 1 ? 's' : ''}</span>
                                    <span>KES {totalPrice.toLocaleString()} </span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleCheckAvailability}
                            disabled={!checkIn || !checkOut || checkAvailability}
                            className='w-full border border-ink text-ink font-mono text-sm uppercase tracking-wide py-2.5 mb-3 hover:bg-ink hover:text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
                        >
                            {checkAvailability ? 'Checking....' : 'Check Availability'}
                        </button>

                        {availability=== true  && (
                            <p className="font-mono  text-xs text-moss mb-3">✓ Available for these dates</p>
                        )}
                        {availability === false && (
                            <p className="font-mono text-xs text-red-700 mb-3">✓ Not available for these dates</p>
                        )}

                        {!isSigned ? (
                            <SignInButton mode='modal'>
                                <button className='w-full bg-brass text-ink font-mono text-sm upperclass tracking-wide py-3 hover:bg-ink hover:text-brass transition-colors'>
                                    Sign In to Book
                                </button>
                            </SignInButton>
                        ) : (
                            <button onClick={handleBook} disabled={availability !== true || booking}
                                    className='w-full bg-brass text-ink font-mono text-sm uppercase tracking-wide py-3 hover:bg-ink  hover:text-brass transition-colors disabled:opacity-40 disabled:cursor-not-allowed'>
                                        {booking ? 'Booking...' : 'Book Now'}                                
                            </button>
                        )}

                        {bookingResult === 'success' && (
                            <p className="font-mono text-xs text-moss mt-3">Booking Confirmed! Check "My Bookings" in the menu</p>
                        )}
                        {bookingResult === 'error' && (
                            <p className="font-mono text-xs text-red-700 mt-3">Booking Failed! Please try again.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails