import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedRooms } from '../api/rooms';
import RoomCard from "./RoomCard";


function Home() {
    const navigate = useNavigate()
    const [city, setCity] = useState('')
    const [guests, setGuests] = useState(1)
    const [featuredRooms, setFeaturedRooms] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getFeaturedRooms()
        .then(setFeaturedRooms)
        .catch((err) => console.error('Failed to load featured rooms:', err))
        .finally(() => setLoading(false))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/rooms?city=${encodeURIComponent(city)}&maxGuests=${guests}`)
    }

    return(
        <div>
            {/*Hero*/}
            <section className="bg-ink text-paper">
                <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
                    <p className="font-mono text-xs uppercase tracking-wideset text-brass mb-4">
                        Est. reservation, no fuss
                    </p>
                    <h1 className="font-display text-5xl md:text-6xl leading-tight max-w-2xl mb-10">
                        A room held for you, wherever the road leads.
                    </h1>

                    {/* Search bar - "key-card" styled*/}
                    <form
                    onSubmit={handleSearch}
                    className="bg-paper text-ink border-2 border-brass flex flex-col md:flex-row"
                    >
                        <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
                            <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">
                                Destination
                            </label>
                            <input 
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)} 
                            placeholder="City"
                            className="w-full bg-transparent font-display text-lg outline-none placeholder:text-charcoal/40"
                            />
                        </div>

                        <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
                            <label className="block font-mono text-xs uppercase tracking -wide text-moss mb-1">
                                Guests
                            </label>
                            <input 
                            type="number" 
                            min="1"
                            value={guests} 
                            onChange={(e) => setGuests(e.target.value)} 
                            className="w-full bg-transparent font-display text-lg outline-none"
                             />
                        </div>

                        <button
                        type="submit"
                        className="bg-brass text-ink font-mono text-sm upppercase tracking-wide px-8 py-4 hover:bg-ink hover:text-brass transition-colors"
                        >
                            Search Rooms
                        </button>
                    </form>
                </div>
            </section>

            {/*Featured Roooms*/}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-baseline justify-between mb-8 border-b border-line pb-4">
                    <h2 className="font-display text-3xl text-ink">Featured Stays</h2>
                    <span className="font-mono text-xs uppercase tracking-wide text-moss">
                        {featuredRooms.length} rooms
                    </span>
                </div>

                {loading ? (
                    <p className="font-mono text-sm text-charcoal/60">Loading rooms.......</p>
                ) : featuredRooms.length === 0 ? (
                    <p className="font-mono text-sm text-charcoal/60">
                        No Featured rooms yet - mark a room as "featured: true" in the database to see it here.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredRooms.map((room) => (
                            <RoomCard key={room._id} room={room} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home