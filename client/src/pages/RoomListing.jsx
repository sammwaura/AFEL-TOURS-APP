import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchRooms } from '../api/rooms'
import RoomCard from '../components/RoomCard'

function RoomListing () {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const city =  searchParams.get('city') || ''
    const maxGuests = searchParams.get('maxGuests') || ''


    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const[minPrice, setMinPrice] = useState('')
    const[maxPrice, setMaxPrice] = useState('')


    useEffect(() => {
        setLoading(true)
        searchRoooms({ city, maxGuests, minPrice, maxPrice })
        .then(setRooms)
        .catch((err) => console.error('Search Failed:', err))
        .finally(() => setLoading(false))
    }, [city,maxGuests])

    const handleFilterApply = () => {
        searchRooms({ city,maxGuests, minPrice, maxPrice })
        .then(setRooms)
        .catch((err) => console.error('Search Failed:', err))
    }


    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="border-b border-line pb-6 mb-8">
                <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">Search Results</p>
                <h1 className="font-display text-4xl text-ink">{city? `Rooms in ${city}` : 'All Rooms'}</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters SideBar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="border border-line p-5 sticky top-6">
                        <h3 className="fobnt-mono text-xs uppercase tracking-wide text-moss mb-4">Refine</h3>
                        <label className="block font-mono text-xs uppercase text-charcoal/60 mb-1">Min price / night</label>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                        className='w-full border border-line px-3 py-2 mb-4 font-mono text-sm outline-none placeholder="0"' />

                        <label className="block font-mono text-xs uppercase text-charcoal/60 mb-1">Max price / night</label>
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                        className='w-full border border-line px-3 py-2 mb-4 font-mono text-sm outline-none placeholder="Any"' />
                        
                        <button onClick={handleFilterApply} 
                            className='w-full bg-ink text-paper font-mono text-sm uppercase tracking-wide py-2.5 hover:bg-brass hover:text-ink transition-colors'>
                                Apply Filters
                            </button>
                    </div>
                </aside>

                {/* Results */}
                <div className="flex-1">
                    {loading ? (
                        <p className="font-mono text-sm text-charcoal/60">Loading rooms...</p>
                    ) : rooms.length === 0 ? (
                        <div className="border border-line p-10 text-center">
                            <p className="font-display text-xl text-ink mb-2">No rooms found..</p>
                            <p className="font-mono text-sm text-charcoal/60">Try a different city or widen your price range</p>
                        </div>
                    ) : (
                        <>
                        <p className="font-mono text-xs uppercase tracking-wide text-moss mb-4">
                            {rooms.length} room{ rooms.length !== 1 ? 's' : ''} found
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap- 6">{rooms.map((room) => (
                            <RoomCard key={room._id} room={room}></RoomCard>
                        ))}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RoomListing