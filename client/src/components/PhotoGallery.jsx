import { useState } from "react";


function PhotoGallery({ photos = [] }){
    const [activeIndex, setActiveIndex] = useState(0)
    const displayPhotos = photos.length > 0 ? photos : ['/placeholder-room.jpg']

    return (
        <div>
            <div className="aspect-16/10 overflow-hidden bg-line mb-3">
            <img 
            src={displayPhotos[activeIndex]} 
            alt={`Room photo ${activeIndex + 1}`}
            onError={(e) => { e.target.src = '/placeholder-room.jpg' }}
            className="w-full h-full object-cover"
            />
            </div>

            {displayPhotos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                    {displayPhotos.map((photo, i) => (
                        <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`shrink-0 w-20 h-16 overflow-hidden border-2 ${i === activeIndex ? 'border-brass' : 'border-transparent'}`}
                        >
                            <img 
                            src={photo} 
                            alt={`Thumbnail ${i + 1}`}
                            onError={(e) => {e.target.src = 'placeholder-room.jpg' }}
                            className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PhotoGallery