import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ServiceCard ({ service }) {
    const [imgError, setImgError ] = useState(false)
    const photos = service.photos && service.photos.length > 0 ? service.photos : []
    const hasValidPhoto = !imgError && photos.length > 0


    return (
        <Link to={`/services/${service.slug}`}
                className='group block border border-line bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow'
        >
            <div className='relative aspect-4/3 overflow-hidden bg-line flex items-center justify-center'>
                {hasValidPhoto ? (
                    <img src={photos[0]} alt={service.name} onError={() => setImgError(true)}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                ) : (
                    <span className='font-display text-sm uppercase tracking-widest text-charcoal/40'>
                        AFEL TOURS KENYA
                    </span>
                )}
            </div>

            <div className="p-5">
                <h3 className="font-display font-semibold text-2xl text-charcoal mb-3">
                    {service.name}
                </h3>
                <p className="text-base leading-relaxed text-charcoal/70 line-clamp-3">
                    {service.shortDescription}
                </p>
            </div>
        </Link>
    )
}


export default ServiceCard