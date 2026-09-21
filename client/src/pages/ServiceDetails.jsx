import { useEffect, useState } from 'react'
import { getItinerariesByService } from '../api/itineraries'
import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../api/services'
import PhotoGallery from '../components/PhotoGallery'


function ServiceDetails() {
    const { slug } = useParams()
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [itineraries, setItineraries] = useState([])

    useEffect(() => {
        getServiceBySlug(slug)
            .then(setService)
            .catch((err) => console.error('Failed to Load service:', err))
            .finally(() => setLoading(false))
    }, [slug])

    useEffect(() => {
      if (!service?._id) return
        getItinerariesByService(service._id)
        .then(setItineraries)
        .catch((err) => console.error('Failed to load itineraries:', err))
         }, [service])


    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-16">
                <p className="font-display text-sm text-charcoal/60">Loading...</p>
            </div>
        )
    }


    if (!service) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-16">
                <p className="font-display text-xl text-charcoal">Service not found</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-brass mb-2">
                    AFEL TOURS KENYA
            </p>
            <h1 className='font-display font-bold text-4xl text-charcoal mb-6'>
                {service.name}
            </h1>

            <PhotoGallery photos={service.photos} />

            <div className="mt-10 border-t border-line pt-6">
                <h2 className='font-display font-semibold text-2xl text-charcoal mb-3'>
                        About This Experience
                </h2>
                <p className='text-charcoal/80 leading-relaxed mb-6 max-w-3xl'>
                        {service.description}
                </p>


                {service.highlights && service.highlights.length > 0 && (
                    <div className='flex flex-wrap gap-3 mb-6'>
                        {service.highlights.map((item) => (
                            <span key={item} className='font-display text-xs uppercase tracking-wide border border-line rounded-full px-4 py-1.5 text-moss'>
                                    {item}
                            </span>
                        ))}
                    </div>
                )}

                {service.startingPrice && (
                    <p className="font-display text-lg text-charcoal mb-6">
                        Starting from{' '}
                        <span className='font-bold text-brass'>
                            KES {service.startingPrice.toLocaleString()}
                        </span>
                    </p>
                )}

                {itineraries.length > 0 ? (
                    <div className="mt-10">
                        <h2 className="font-display font-semibold text-2xl text-charcoal mb-6">
                        Available Itineraries
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {itineraries.map((itinerary) => (
                            <Link
                            key={itinerary._id}
                            to={`/itineraries/${itinerary._id}`}
                            className="block border border-line rounded-xl bg-white p-5 hover:border-brass transition-colors"
                            >
                            <h3 className="font-display font-bold text-lg text-charcoal mb-1">
                                {itinerary.name}
                            </h3>
                            <p className="font-display text-xs uppercase tracking-wide text-moss mb-3">
                                {itinerary.park}
                            </p>
                            <div className="flex flex-wrap gap-3 font-display text-xs text-charcoal/60 mb-3">
                                <span>{itinerary.nights}N / {itinerary.days}D</span>
                                <span>Up to {itinerary.maxGroupSize} guests</span>
                                {itinerary.nearestHotel && <span>Near {itinerary.nearestHotel.name}</span>}
                            </div>
                            <p className="font-display text-base font-semibold text-ink">
                                KES {itinerary.price?.toLocaleString()}
                            </p>
                            </Link>
                        ))}
                        </div>
                    </div>
                    ) : (
                    <Link
                        to={`/services/${service.slug}/inquire`}
                        className="inline-block bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:bg-moss transition-colors"
                    >
                        Request This Experience
                    </Link>
                )}
            </div>
        </div>
    )
}

export default ServiceDetails