import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useUser, SignInButton } from '@clerk/clerk-react'
import { getSingleRoom } from '../api/rooms'
import { createBooking } from "../api/bookings";

function Inquiry() {
            const { roomId } = useParams()
            const navigate = useNavigate()
            const { isSignedIn, user } = useUser()

            const [room, setRoom] =  useState(null)
            const [loading, setLoading] = useState(true)


            const [checkIn, setCheckIn] = useState('')
            const [checkOut, setCheckOut] = useState('')
            const [guests, setGuests] = useState(1)
            const [hasKids, setHasKids] = useState(false)
            const [kidsAges, setKidsAges] = useState([''])

            
            const [submitting, setSubmitting] = useState(false)
            const [result, setResult] = useState(null) // 'success' | 'error' | null
            const[formError, setFormError] = useState('')


            useEffect(() => {
                getSingleRoom(roomId)
                    .then(setRoom)
                    .catch((err) => console.error('Failed to load room:', err))
                    .finally(() => setLoading(false))
            }, [roomId])


            const nights =  checkIn && checkOut ? Math.max(0, Math.ceil((newDate(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
            : 0

            const estimatedTotal = room ? nights * room.pricePerNight : 0

            const handleAddChild = () => setKidsAges([...kidsAges, ''])
            const handleRemoveChild = (index) => setKidsAges(kidsAges.filter((_, i) => i !== index))
            const handleChildAgeChange = (index, value) => {
                const updated = [...kidsAges]
                updated[index] = value
                setKidsAges(updated)
            }


            const handleSubmit = async (e) => {
                e.preventDefault()
                setFormError('')

                if (!checkIn || checkOut){
                    setFormError('Please select check-In and check-Out dates..')
                    return
                }
                if (new Date (checkIn)>= new Date(checkOut)){
                    setFormError('Check-out must be after Check-in.')
                    return
                }
                if (hasKids && kidsAges.some((age) => age === '' || Number(age) < 0 )){
                    setFormError('Please enter valid age for each child, or remove the empty field.')
                    return
            }

                setSubmitting(true)
                setResult(null)
                try{
                    await createBooking({
                        room: roomId,
                        userId: user._id,
                        userEmail: user.primaryEmailAddress?.emailAddress,
                        checkIn,
                        checkOut,
                        guests,
                        hasKids,
                        kidsAges: hasKids ? kidsAges.map(Number) : [],
                    })
                    setResult('success')
                } catch (err) {
                    console.error('Inquiry submission failed::', err)
                    setResult('error')
                } finally {
                    setSubmitting(false)
                }
        }

        if (loading) {
            return(
                <div className="max-w-2xl mx-auto px-6 py-16">
                    <p className="font-mono text-sm text-charcoal/60">Loading....</p>
                </div>
            )
        }

        if(!room){
            return(
                <div className="max-w-2xl mx-auto px-6 py-16">
                    <p className="font-display text-xl text-ink">Room not found</p>
                </div>
            )
        }

        if(result === 'success') {
        return (
            <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">Request Received</p>
                <h1 className="font-display text-3xl text-ink mb-4">Your Inquiry has been submitted</h1>
                <p className="text-charcoal/70 mb-8 max-w-md mx-auto">We'll review availabitily for {room.roomType} and get back to you shortly to confirm your dates</p>
                <button onClick={() => navigate('/hotels')}
                    className="bg-brass text-ink font-mono text-sm uppercase tracking-wide px-8 py-3 hover:bg-ink hover:text-brass transition-colors"
                    >
                        Browse more hotels
                </button>
            </div>
         )
        }

        return (
                <div className="max-w-2xl mx-auto px-6 py-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">Request to Book</p>
                    <h1 className="font-display text-3xl text-ink mb-1">{room.roomType}</h1>
                    <p className="text-charcoal/70 mb-8">{room.hotel?.name} - {room.hotel?.city}</p>


                    <form onSubmit={handleSubmit} className="border-2 border-brass p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">Check In</label>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full border border-line px-3 py-2 font-mono text-sm outline-none focus:border-brass"/>
                            </div>
                        
                        <div>
                        <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">Check Out</label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full border border-line px-3 py-2 font-mono text-sm outline-none focus:border-brass" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">Number of guests</label>
                        <input type="number" min="1" max={room.maxGuests} value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full border border-line px-3 py-2 font-mono text-sm outline-none focus:border-brass"/>
                            <p className="font-mono text-xs text-charcoal/50 mt-1">Max {room.maxGuests} guests for this room type</p>
                    </div>

                    <div className="mb-4 border-t border-line pt-4">
                        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-moss mb-3">
                        <input type="checkbox" checked={hasKids} onChange={(e) => setHasKids(e.target.checked)} 
                            className="accent-brass" /> Travelling with Kids
                        </label>

                        {hasKids && (
                            <div className="space-y-2">
                                {kidsAges.map((age, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input type="number" min="1" max="17" placeholder={`Child ${index + 1} age`}
                                            value={age} onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                                className="flex-1 border border-line px-3 py-2 font-mono text-sm outline-none focus:border-brass"/>
                                                {kidsAges.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveChild(index)}
                                                    className="font-mono text-xs text-charcoal/50 hover:text-red-700 px-2">
                                                        Remove
                                                </button>
                                                )}
                                    </div>
                                ))} 
                                <button type="button" onClick={handleAddChild} className="font-mono text-xs uppercase tracking-wide hover:text-brass">
                                        + Add another child
                                </button>
                            </div>
                        )}
                    </div>


                    {nights > 0 && (
                        <div className="font-mono text-sm text-charcoal/70 mb-4 border-t border-line pt-3">
                            <div className="flex justify-between">
                                <span>{nights} night{nights !== 1 ? 's' : ''} (estimate)</span>
                                <span>KES {estimatedTotal.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-charcoal/50 mt-1">
                                Final price will be confirmed with your booking
                            </p>
                        </div>
                    )}

                    {formError && (
                        <p className="font-mono text-xs text-red-700 mb-4">{formError}</p>
                    )}

                    {!isSignedIn ? (
                        <SignInButton mode="modal">
                            <button type="button" 
                            className="w-full bg-brass text-ink font-mono text-sm uppercase tracking-wide py-3 hover:bg-ink hover:text-brass transition-colors">
                                Sign In Submit Request
                            </button>
                        </SignInButton>
                    ) : (
                        <button type="submit" disabled={submitting}
                            className="w-full bg-brass text-ink font-mono text-sm uppercase tracking-wide py-3 hover:bg-ink hover:text-brass transition-colors disabled:opacity-40">
                                {submitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    )}

                    {result === 'error' && (
                        <p className="font-mono text-xs text-red-700 mt-3">
                            Something went wrong submitting your request. Please try again.
                        </p>
                    )}
                    </form>
                </div>
        )
}

export default Inquiry;
