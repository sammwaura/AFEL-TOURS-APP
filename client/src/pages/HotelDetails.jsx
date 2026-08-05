import { useState, useEffect }  from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleHotel } from "../api/hotels";
import { getRoomsByHotel } from "../api/rooms";
import PhotoGallery from "../components/PhotoGallery";
import RoomTypeCard from "../components/RoomTypeCard";

function HotelDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState(null);
    const [roomTypes, setRoomTypes] = useState(null);
    const[selectedRoom, setSelectedRoom] = useState(null);
    cpnst [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getSingleHotel(id), getRoomsByHotel(id)])
         .then(([hotelData, roomsData]) => {
            setHotel(hotelData);
            setRoomTypes(roomsData);
        })
        .catch((err) => console.error('Failed to fetch hotel or room data:', err))
        .finally(() => setLoading(false));
    }, [id]);

    const handleContinue = () => {
        if (!selectedRoom) return;
        navigate(`/inquire/${selectedRoom._id}`);
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="font-mono text-sm text-charcoal/60">Loading hotel...</p>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="font-display text-xl text-ink">Hotel Not Found</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
                {hotel.city}
            </p>
            <h1 className="font-display text-4xl text-ink mb-2">
                {hotel.name}
            </h1>
            {hotel.address && (
                <p className="text-charcoal/70 mb-6">{hotel.address}</p>
            )}
        

        {/* Photo Gallery */}
        <PhotoGallery photos={hotel.photos} />

        {/* Description & Ammenities*/}
        <div className="mt-10 border-t border-line pt-6">
            <h2 className="font-display text-2xl text-ink mb-3">About this property</h2>
            <p className="text-charcoal/80 leading-relaxed mb-6 max-w-3xl">
                {hotel.description}
            </p>

            {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                    {hotel.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="font-mono text-xs uppercase tracking-wide border border-line px-3 py-1.5 text-moss"
                        >
                            {amenity}
                        </span>
                    ))}
                </div>
            )}
        </div>

        {/* Room Type Picker */}
        <div className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-2xl text-ink mb-1">Choose a Room Type</h2>
            <p className="font-mono text-xs text-charcoal/60 mb-6">
                Select a room type to proceed with your booking.
            </p>

            {roomTypes.length === 0 ? (
                <div className="border border-line bg-white p-6 text-center">
                    <p className="font-display text-lg text-ink mb-2">This room type is not available for this hotel.</p>
                    <p className="font-mono text-sm text-charcoal/60">
                        Please call us for more information
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {roomTypes.map((room) => (
                        <RoomTypeCard
                            key={room._id}
                            room={room}
                            isSelected={selectedRoom?._id === room._id}
                            onSelect={setSelectedRoom}
                        />
                    ))}
                </div>
            )}

            <button
                onClick={handleContinue}
                disabled={!selectedRoom}
                className="bg-brass text-ink font-mono text-sm uppercase tracking-wide px-8 py-3.5 hover:bg-ink 
                           hover:text-brass transition-colors disabled:opacity-40 disabled:cursor-not-allowed">

            {selectedRoom
              ? `Continue with ${selectedRoom.roomType}`
              : 'Select a room type'}
            </button>
        </div>
         </div>
    );
}

export default HotelDetails;

