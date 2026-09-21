import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSingleItinerary } from '../api/itineraries'
import PhotoGallery from '../components/PhotoGallery'

function ItineraryDetails() {
  const { id } = useParams()
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSingleItinerary(id)
      .then(setItinerary)
      .catch((err) => console.error('Failed to load itinerary:', err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-16"><p className="font-display text-sm text-charcoal/60">Loading…</p></div>
  }

  if (!itinerary) {
    return <div className="max-w-4xl mx-auto px-6 py-16"><p className="font-display text-xl text-charcoal">Itinerary not found</p></div>
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-brass mb-2">
        {itinerary.park}
      </p>
      <h1 className="font-display font-bold text-4xl text-charcoal mb-6">
        {itinerary.name}
      </h1>

      <PhotoGallery photos={itinerary.photos} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 font-display text-sm">
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="text-xs text-charcoal/50 uppercase mb-1">Duration</p>
          <p className="font-semibold text-charcoal">{itinerary.nights}N / {itinerary.days}D</p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="text-xs text-charcoal/50 uppercase mb-1">Max Group</p>
          <p className="font-semibold text-charcoal">{itinerary.maxGroupSize}</p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center col-span-2 sm:col-span-1">
          <p className="text-xs text-charcoal/50 uppercase mb-1">Price</p>
          <p className="font-semibold text-charcoal">KES {itinerary.price?.toLocaleString()}</p>
        </div>
        {itinerary.nearestHotel && (
          <div className="border border-line rounded-lg p-4 text-center col-span-2 sm:col-span-1">
            <p className="text-xs text-charcoal/50 uppercase mb-1">Nearest Lodge</p>
            <p className="font-semibold text-charcoal">{itinerary.nearestHotel.name}</p>
          </div>
        )}
      </div>

      <p className="text-charcoal/80 leading-relaxed mb-6">{itinerary.description}</p>

      {itinerary.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {itinerary.highlights.map((h) => (
            <span key={h} className="font-display text-xs uppercase tracking-wide border border-line rounded-full px-4 py-1.5 text-moss">
              {h}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/services/${itinerary.service?.slug}/inquire?itinerary=${itinerary._id}`}
        className="inline-block bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:bg-moss transition-colors"
      >
        Request This Itinerary
      </Link>
    </div>
  )
}

export default ItineraryDetails