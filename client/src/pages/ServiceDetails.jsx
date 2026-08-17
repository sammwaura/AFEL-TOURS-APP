import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../api/services'
import PhotoGallery from '../components/PhotoGallery'


function ServiceDetails() {
    const { slug } = useParams()
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getServiceBySlug(slug)
            .then(setService)
            .catch((err) => console.error('Failed to Load service:', err))
            .finally(() => setLoading(false))
    }, [slug])


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

                <Link to={`/services/${service.slug}/inquire`} className='inline-block bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:bg-moss transition-colors'>
                        Request This Experience
                </Link>
            </div>
        </div>
    )
}

export default ServiceDetails