import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { searchHotels } from "../api/hotels"
import HotelCard from "../components/HotelCard"

function HotelListing() {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const initialName = searchParams.get('name') || ''
    const initialCity = searchParams.get('city') || ''

    const [ name, setName ] = useState(initialName)
    const [ city, setCity ] = useState(initialCity)
    const [ hotels, setHotels ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const runSearch = (n, c) => {
        setLoading(true)
        searchHotels({ name: n, city: c })
        .then(setHotels)
        .catch((err) => console.error('Search failed:', err))
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        runSearch(initialName, initialCity)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        runSearch(name, city)
    }

    return(
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="border-b border-line pb-6 mb-8">
                <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
                    Resort & Safri Lodges Available
                </p>
                <h1 className="font-display text-4xl text-ink">
                    Browse your next destination....
                </h1>
            </div>
            
            <form onSubmit={handleSearch} className="bg-white border border-line flex flex-col md:flex-row mb-10">
                <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
                    <label className="block font-mono text-xs uppercase tracing-wide text-moss mb-1">
                        Hotel Name
                    </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bamburi Beach" 
                    className="w-full outline-none font-display text-lg placeholder:text-charcoal/40">
                    </input>
                </div>

                <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
                    <label className="block font-mono text-xs uppercase tracking-wide text-moss">
                        City / Location
                    </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mombasa" 
                    className="w-full outline-none font-display text-lg placeholder:text-charcoal/40">
                    </input>
                </div>

                <button 
                type="submit"
                className="bg-brass text-ink font-mono text-sm uppercase tracking-wide px-8 py-4 hover:bg-ink hover:text-brass transition-colors">
                    Search
                </button>
            </form>

            {loading ? (
                <p className="font-mono text-sm text-charcoal/60">Loading hotels...</p>
            ) : hotels.length === 0 ? (
                <div className="border border-line p-10 text-center">
                    <p className="font-display text-xl text-ink mb-2">No hotels found</p>
                    <p className="font-mono text-sm text-charcoal/60">Try a different name or location</p>
                </div>
            ) : (
                <>
                <p className="font-mono text-xs uppercase tracking-wide text-moss mb-4">
                    {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} found
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default HotelListing
