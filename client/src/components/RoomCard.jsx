import { useState } from 'react'
import { Link } from 'react-router-dom'

function RoomCard({room}) {
    const  [imgError, setImgError] = useState(false)

    const photos  = room.photos && room.photos.length > 0 ? room.photos : []
    const photo = !imgError && photos.length > 0 ? photos[0] : 'placeholder-room.jpg'

    
    return (
        <Link
        to={`/rooms/${room._id}`}
        className='group block border border-line bg-white'>
            <div className='relative aspect-4/3 overflow-hidden bg-line'>
            <img src={photo} alt={room.roomType} onError={() => setImgError(true)}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />

            {photos.length > 1 && (
                <span className='absolute botttom-2 right-2 bg-ink/80 text-paper font-mono text-[10px] uppercase tracking wide px-2 py-1'>
                    +{photos.length - 1} more
                </span>
            )}
            </div>

            <div className='p-4'>
                <p className='font-mono text-xs uppercase tracking-wide text-moss mb-1'>
                    {room.hotel?.city}
                </p>
                <h3 className='font-display text-lg text-ink mb-1'>
                    {room.roomType}
                </h3>
                <p className='text-sm text-charcoal/70 mb-3'>
                    {room.hotel?.name}
                </p>
                <div className='flex items-baseline justify-between border-t border-line pt-3'>
                    <span className='font-mono text-base text-link'>
                        KES {room.pricePerNight?.toLocaleString()}
                    </span>
                    <span className='font-mono text-xs text-charcoal/60'>
                    /night
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default RoomCard