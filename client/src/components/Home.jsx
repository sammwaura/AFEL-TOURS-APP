import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedHotels } from '../api/hotels';
import HotelCard  from "../components/HotelCard";
import ServiceCard from "./ServiceCard";
import { getAllServices } from "../api/services";
import Testimonials from "./Testimonials";


function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [featuredHotels, setFeaturedHotels] = useState([])
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getFeaturedHotels()
        .then(setFeaturedHotels)
        .catch((err) => console.error('Failed to load featured hotels:', err))
        .finally(() => setLoading(false))

        getAllServices()
        .then(setServices)
        .catch((err) => console.error('Failed to load services:', err) )
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/hotels?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`)
    }

    return(
        <div>
            {/*Hero*/}
                <section
                    className="relative text-paper bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero.jpg')" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />

                    <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
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

                        {/* What We Do */}
            <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-8">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-brass mb-2">
                What We Do
                </p>
                <h2 className="font-display font-bold text-3xl text-charcoal">
                Curated Experiences From Safaris to Beach Resorts
                </h2>
            </div>

            {services.length === 0 ? (
                <p className="font-display text-sm text-charcoal/60">Loading services…</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
                </div>
            )}
            </section>

            {/* About Us */}
            <section className="bg-moss/5 border-y border-line">
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                <img
                    src="/logo.png"
                    alt="AFEL Tours"
                    className="w-48 h-48 mx-auto md:mx-0"
                />
                </div>

                <div>
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-brass mb-3">
                    Who We Are
                </p>
                <h2 className="font-display font-bold text-3xl text-charcoal mb-4">
                    Converging Nature &amp; Leisure
                </h2>
                <p className="text-charcoal/80 leading-relaxed mb-4">
                    AFEL Tours — African Forests Escapade Limited — is a bush-to-beach
                    curated tour company. We handle everything from hotel reservations
                    and safari logistics to mountain hikes, corporate retreats, and
                    honeymoon itineraries, working with trusted partners across Kenya's
                    parks, coastlines, and highlands.
                </p>
                <p className="text-charcoal/80 leading-relaxed">
                    Whatever the occasion — a solo escape, a family holiday, or a
                    once-in-a-lifetime honeymoon — we design the journey and manage the
                    details, so you can simply show up and experience it.
                </p>
                </div>
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
        <Testimonials />
    </div>

    )
}

export default Home