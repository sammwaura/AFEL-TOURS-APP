import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHotels, deleteHotel } from "../../api/hotels";


function AdminHotels(){
    const [ hotels, setHotels ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ deletingId, setDeletingId ] = useState(null)


    const loadHotels = () => {
        setLoading(true)
        getAllHotels()
            .then(setHotels)
            .catch((err) => console.error('Faileed to load hotels:', err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadHotels()
    }, [])


    const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone. Room types under this hotel will not be automatically removed.`)) {
      return
    }
    setDeletingId(id)
    try {
        await deleteHotel(id)
        setHotels((prev) => prev.filter((h) => h._id !== id))
    } catch (err) {
        console.error('Failed to delete hotel:', err)
        alert('Failed to delete hotel. Please try again.')
    } finally {
        setDeletingId(null)
    }
}

return(
    <div>
        <div className="flex items-center justify-betweenmb-8">
            <div>
                <h1 className="font-display font-bold text-3xl text-charcoal mb-1">Hotels</h1>
                <p className="text-charcoal/60">Manage your contracted hotels</p>
            </div>
            <Link to="/admin/hotels/new" className="bg-brass text-white font-display text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-moss transition-colors">
                + Add Hotel
            </Link>
        </div>

        {loading ? (
            <p className="font-display text-sm text-charcoal/60">Loading...</p>
        ) : hotels.length === 0 ? (
            <div className="border border-line rounded-xl p-10 text-center bg-white">
                <p className="font-display text-charcoal/60">No hotels yet...</p>
            </div>
        ) : (
            <div className="bg-white border border-line rounded-xl overflow-x-hidden">
                <table className="w-full text-sm table-auto border-collapse">
                    <thead className="bg-paper border-b border-line">
                        <tr className="text-left font-display text-xs  uppercase tracking-wide text-charcoal/60">
                        <th className="px-5 py-3 whitespace-nowrap">Name</th>
                        <th className="px-5 py-3 whitespace-nowrap">City</th>
                        <th className="px-5 py-3 whitespace-nowrap">Photos</th>
                        <th className="px-5 py-3 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel._id} className="border-b border-line last:border-b-0">
                                <td className="px-5 py-4 font-display font-medium text-charcoal">
                                    {hotel.name}
                                </td>
                                <td className="px-5 py-4 text-charcoal/70">{hotel.city}</td>
                                <td className="px-5 py-4 text-charcoal/70">{hotel.photos?.length || 0}
                                </td>
                                <td className="px-5 py-4 text-right space-x-3">
                                    <Link to={`/admin/hotels/${hotel._id}/edit`}
                                          className="font-display text-xs uppercase tracking-wide text-moss hover:text-brass">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(hotel._id, hotel.name)} disabled={deletingId === hotel._id}
                                            className="font-display text-xs uppercase tracking-wide text-red-700 hover:text-red-900 disabled:opacity-40">
                                                {deletingId === hotel._id ? 'Deleting...' : 'Delete'}
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

export default AdminHotels