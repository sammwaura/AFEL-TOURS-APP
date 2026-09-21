import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFeaturedHotels } from '../api/hotels'
import { getAllServices } from '../api/services'
import HotelCard from '../components/HotelCard'
import ServiceCard from '../components/ServiceCard'
import Testimonials from '../components/Testimonials'

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
      .catch((err) => console.error('Failed to load services:', err))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/hotels?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`)
  }

  return (
    <div>
      {/* Badge + What We Do intro */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-14 text-center">
        <img src="/logo.png" alt="AFEL Tours" className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-6" />
        <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-widest text-brass mb-4">
          Converging Nature &amp; Leisure
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-charcoal mb-6">
          What We Do
        </h1>
        <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          AFEL Tours curates full journeys across Kenya — hotel stays, safaris,
          hikes, honeymoons, corporate retreats, and family getaways — bush to
          beach, planned end to end.
        </p>
      </section>

      {/* Services listing */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {services.length === 0 ? (
          <p className="font-display text-sm text-charcoal/60 text-center">Loading services…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* Hero + hotel search */}
      <section className="relative text-paper min-h-[560px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1691161510065-298039a5b51b?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          alt="Sunset over Diani Beach, Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pb-16 w-full">
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight max-w-2xl mb-8">
            Bush to beach.
          </h2>

          <form
            onSubmit={handleSearch}
            className="bg-paper text-charcoal border-2 border-brass rounded-xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
              <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sunset Inn"
                className="w-full outline-none font-display text-lg placeholder:text-charcoal/40"
              />
            </div>

            <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r border-line">
              <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Nairobi"
                className="w-full outline-none font-display text-lg placeholder:text-charcoal/40"
              />
            </div>

            <button
              type="submit"
              className="bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-8 py-4 hover:bg-moss transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              Search Hotels
            </button>
          </form>
        </div>
      </section>

          {/* About Us */}
      <section className="bg-moss/5 border-y border-line">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-widest text-brass mb-3">
            Who We Are
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal mb-4">
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
      </section>

      {/* Our Properties */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8 border-b border-line pb-4">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal">Our Properties</h2>
          <span className="font-display text-xs uppercase tracking-wide text-moss">
            {featuredHotels.length} hotels
          </span>
        </div>

        {loading ? (
          <p className="font-display text-sm text-charcoal/60">Loading hotels…</p>
        ) : featuredHotels.length === 0 ? (
          <p className="font-display text-sm text-charcoal/60">
            No hotels listed yet.
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