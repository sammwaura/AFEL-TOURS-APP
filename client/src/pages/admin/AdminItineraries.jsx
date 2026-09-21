import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getItinerariesByService, deleteItinerary } from '../../api/itineraries'
import { getServiceById } from '../../api/services'

function AdminItineraries() {
  const { serviceId } = useParams()
  const [service, setService] = useState(null)
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const loadData = () => {
    setLoading(true)
    Promise.all([getServiceById(serviceId), getItinerariesByService(serviceId)])
      .then(([serviceData, itinerariesData]) => {
        setService(serviceData)
        setItineraries(itinerariesData)
      })
      .catch((err) => console.error('Failed to load itineraries:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      await deleteItinerary(id)
      setItineraries((prev) => prev.filter((i) => i._id !== id))
    } catch (err) {
      console.error('Failed to delete itinerary:', err)
      alert('Failed to delete itinerary. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="font-display text-sm text-charcoal/60">Loading…</p>
  }

  return (
    <div>
      <Link
        to="/admin/services"
        className="font-display text-xs uppercase tracking-wide text-charcoal/50 hover:text-charcoal mb-4 inline-block"
      >
        ← Back to Services
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-charcoal mb-1">
            Itineraries
          </h1>
          <p className="text-charcoal/60">{service?.name}</p>
        </div>
        <Link
          to={`/admin/services/${serviceId}/itineraries/new`}
          className="bg-brass text-white font-display text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-moss transition-colors"
        >
          + Add Itinerary
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="border border-line rounded-xl p-10 text-center bg-white">
          <p className="font-display text-charcoal/60">No itineraries yet for this service.</p>
        </div>
      ) : (
        <div className="bg-white border border-line rounded-xl overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="bg-paper border-b border-line">
              <tr className="text-left font-display text-xs uppercase tracking-wide text-charcoal/60">
                <th className="px-5 py-3 whitespace-nowrap">Name</th>
                <th className="px-5 py-3 whitespace-nowrap">Park</th>
                <th className="px-5 py-3 whitespace-nowrap">Duration</th>
                <th className="px-5 py-3 whitespace-nowrap">Max Group</th>
                <th className="px-5 py-3 whitespace-nowrap">Price</th>
                <th className="px-5 py-3 whitespace-nowrap">Nearest Hotel</th>
                <th className="px-5 py-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itineraries.map((itinerary) => (
                <tr key={itinerary._id} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-4 font-display font-medium text-charcoal whitespace-nowrap">
                    {itinerary.name}
                  </td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">{itinerary.park}</td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">
                    {itinerary.nights}N / {itinerary.days}D
                  </td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">{itinerary.maxGroupSize}</td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">
                    KES {itinerary.price?.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">
                    {itinerary.nearestHotel?.name || '—'}
                  </td>
                  <td className="px-5 py-4 text-right space-x-3 whitespace-nowrap">
                    <Link
                      to={`/admin/services/${serviceId}/itineraries/${itinerary._id}/edit`}
                      className="font-display text-xs uppercase tracking-wide text-moss hover:text-brass"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(itinerary._id, itinerary.name)}
                      disabled={deletingId === itinerary._id}
                      className="font-display text-xs uppercase tracking-wide text-red-700 hover:text-red-900 disabled:opacity-40"
                    >
                      {deletingId === itinerary._id ? 'Deleting…' : 'Delete'}
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

export default AdminItineraries