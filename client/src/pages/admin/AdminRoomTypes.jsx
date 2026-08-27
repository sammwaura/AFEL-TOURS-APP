import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleHotel } from "../../api/hotels";
import { deleteRoom, getRoomsByHotel } from "../../api/rooms";

function AdminRoomTypes() {
    const { hotelId } = useParams() 
    const [ hotel, setHotel ] = useState(null)
    const [ rooms, setRooms ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ deletingId, setDeletingId ] = useState(null)


    const loadData = () => {
        setLoading(true)
        Promise.all([getSingleHotel(hotelId), getRoomsByHotel(hotelId)])
            .then(([hotelData, roomsData]) => {
                setHotel(hotelData)
                setRooms(roomsData)
            })
            .catch ((err) => console.error('Failed to load room types:', err))
            .finally(() => setLoading(false))
    }


    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotelId])


    const handleDelete = async (id, roomType) => {
        if (!window.confirm(`Delete "${roomType}"? This cannot be undone.`)) return
        setDeletingId(id)
        try {
            await deleteRoom(id)
            setRooms((prev) => prev.filter((r) => r._id !== id))
        } catch (err) {
            console.error('Failed to delete room:', err)
            alert('Failed to delete room type. Please try again.')
        } finally {
            setDeletingId(null)
        }
    }


    if (loading) {
        return <p className="font-display text-sm text-charcoal/60">Loading....</p>
    }

    return (
        <div>
            <Link to="/admin/hotels" className="font-display text-xs uppercase tracking-wide text-charcoal/50 hover:text-charcoal mb-4 inline-block">
                ← Back to Hotels 
            </Link>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display font-bold text-3xl text-charcoal mb-1">Room Types</h1>
                    <p className="text-charcoal/60">{hotel?.name}</p>
                </div>
                <Link to={`/admin/hotels/${hotelId}/rooms/new`} className="bg-brass text-white font-display text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-moss transition-colors"                    
                    >
                         + Add Room Type
                </Link>
            </div>

            {rooms.length === 0 ? (
                <div className="border border-line rounded-xl p-10 text-center bg-white">
                    <p className="font-display text-charcoal/60">No room types yet for this hotel.</p>
                </div>
            ) : (
                <div className="bg-white border border-line rounded-xl overflow-x-auto">
                    <table className="w-full text-sm table-auto border-collapse">
                        <thead className="bg-paper border-b border-line">
                            <tr className="text-left font-display text-xs uppercase tracking-wide text-charcoal/60">
                                <th className="px-5 py-3 whitespace-nowrap">Room Type</th>
                                <th className="px-5 py-3 whitespace-nowrap">Price/Night</th>
                                <th className="px-5 py-3 whitespace-nowrap">Max Guests</th>
                                <th className="px-5 py-3 whitespace-nowrap">Featured</th>
                                <th className="px-5 py-3 text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room._id} className="border-b border-line last:border-b-0">
                                    <td className="px-5 py-4 font-display font-medium text-charcoal whitespace-nowrap">
                                        {room.roomType}
                                    </td>
                                    <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">
                                        KES {room.pricePerNight?.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">
                                        {room.maxGuests}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        {room.featured ? (
                                            <span className="text-xs font-display uppercase text-moss">Yes</span>
                                        ) : (
                                            <span className="text-xs font-display uppercase text-charcoal/40">No</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right space-x-3 whitespace-nowrap">
                                        <Link to={`/admin/hotels/${hotelId}/rooms/${room._id}/edit`} className="font-display text-xs uppercase tracking-wide text-moss hover:text-brass">
                                                Edit
                                        </Link>
                                        <button onClick={() => handleDelete(room._id, room.roomType)} disabled={deletingId === room._id} className="font-display text-xs uppercase tracking-wide text-red-700 hover:text-red-900 disabled:opacity-40">
                                            {deletingId === room._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminRoomTypes

