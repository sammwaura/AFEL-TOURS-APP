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

                        
                    </div>
                </div>
            </div>
        </div>
    )


    
}