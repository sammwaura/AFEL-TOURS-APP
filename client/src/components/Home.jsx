import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedHotels } from '../api/hotels';
import HotelCard  from "../components/HotelCard";


function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [featuredHotels, setFeaturedHotels] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getFeaturedHotels()
        .then(setFeaturedHotels)
        .catch((err) => console.error('Failed to load featured hotels:', err))
        .finally(() => setLoading(false))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/hotels?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`)
    }

    return(
        <div>
            {/*Hero*/}
            <section className="bg-ink text-paper">
                <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
                    <p className="font-mono text-xs uppercase tracking-wideset text-brass mb-4">
                        We converge nature & culture to create unforgettable experiences
                    </p>
                    <h1 className="font-display text-5xl md:text-6xl leading-tight max-w-2xl mb-10">
                     Explore the best of Kenya with our curated travel experiences.
                    </h1>

                    {/* Search bar - "key-card" styled*/}
                    <form
                    onSubmit={handleSearch}
                    className="bg-paper text-ink border-2 border-brass flex flex-col md:flex-row"
                    >
                        <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
                            <label className="block font-mono text-xs uppercase tracking-wide text-moss mb-1">
                                HOTEL NAME
                            </label>
                            <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="e.g Sarova Whitesands"
                            className="w-full bg-transparent font-display text-lg outline-none placeholder:text-charcoal/40"
                            />
                        </div>

                        <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
                            <label className="block font-mono text-xs uppercase tracking -wide text-moss mb-1">
                                City / Location
                            </label>
                            <input 
                            type="text" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            placeholder="e.g Mombasa"
                            className="w-full bg-transparent font-display text-lg outline-none"
                             />
                        </div>

                        <button
                        type="submit"
                        className="bg-brass text-ink font-mono text-sm upppercase tracking-wide px-8 py-4 hover:bg-ink hover:text-brass transition-colors"
                        >
                            Search Hotels
                        </button>
                    </form>
                </div>
            </section>

            {/*Featured Roooms*/}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-baseline justify-between mb-8 border-b border-line pb-4">
                    <h2 className="font-display text-3xl text-ink">Our Contracted Hotels & Lodges</h2>
                    <span className="font-mono text-xs uppercase tracking-wide text-moss">
                        {featuredHotels.length} hotels
                    </span>
                </div>

                {loading ? (
                    <p className="font-mono text-sm text-charcoal/60">Loading hotels.......</p>
                ) : featuredHotels.length === 0 ? (
                    <p className="font-mono text-sm text-charcoal/60">
                        No Availablle hotels yet 
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredHotels.map((hotel) => (
                            <HotelCard key={hotel._id} hotel={hotel} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home