function RoomTypeCard({ room, isSelected, onSelect }) {

    return (
        <button onClick={() => onSelect(room)}
            className={`text-left border-2 bg-white p-4 transition-colors w-full ${isSelected
                ? 'border-brass ring-1 ring-brass/20' : 'border-line hover:border-charcoal/40'
            }`}
        >
            {/* ThumbNail */}
            {room.photos && room.photos.length > 0 && (
                <div className="mb-3" aspect-video bg-line overflow-hidden>
                    <img 
                      src={room.photos[0]}
                        alt={room.roomType}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror =null;
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <h4 className="font-display text-lg text-ink mb-1">{room.roomType}</h4>
            <p className="font-mono text-xs text-charcoal/60 mb-3">
                Sleeps up to {room.maxGuests}
            </p>
            <div className="border-t border-line pt-2 flex items-baseline gap-1">
                <span className="font-mono text-base text-ink">
                    KES {room.pricePerNight?.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-charcoal/60">
                     / night
                </span>
            </div>
        </button>
    );
}


export default RoomTypeCard;