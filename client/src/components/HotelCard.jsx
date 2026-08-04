import { Link } from "react-router-dom";
import { useState } from "react";

function HotelCard({ hotel }) {
    const [imgError, setImgError] = useState(false)

    const photos = hotel.photos && hotel.photos.length > 0 ? hotel.photos : []
    const hasValidPhoto =  !imgError && photos.length > 0 

    return (
        <Link 
         to={`/hotels/${hotel._id}`}
         className="group block border-line bg-white">
            <div className="relative aspect-4/3 overflow-hidden bg-line flex items-center judtify-center">
                {hasValidPhoto ? (
                    <img 
                        src={photos[0]}
                        alt={hotel.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                ) : (
                    <span className="font-mono text-xs uppercase tracking-widest text-charcoal/40">
                    No photo yet
                    </span>
                )}
            </div>

            <div className="p-4">
                <p className="font-mono text-xs uppercase tracking-wide text-moss mb-1">{hotel.city}</p>
                <h3 className="font-display text-xl text-ink mb-1">{hotel.name}</h3>
                <p className="text-sm text-charcoal/70 line-clamp-2">{hotel.description}</p>
                </div>
         </Link>
    )
}


export default HotelCard