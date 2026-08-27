import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllServices, deleteService } from '../../api/services'

function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  const loadServices = () => {
    setLoading(true)
    getAllServices()
      .then(setServices)
      .catch((err) => console.error('Failed to load services:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      await deleteService(id)
      setServices((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error('Failed to delete service:', err)
      alert('Failed to delete service. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-charcoal mb-1">Services</h1>
          <p className="text-charcoal/60">Manage your curated experiences</p>
        </div>
        <Link
          to="/admin/services/new"
          className="bg-brass text-white font-display text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-moss transition-colors"
        >
          + Add Service
        </Link>
      </div>

      {loading ? (
        <p className="font-display text-sm text-charcoal/60">Loading…</p>
      ) : services.length === 0 ? (
        <div className="border border-line rounded-xl p-10 text-center bg-white">
          <p className="font-display text-charcoal/60">No services yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-line rounded-xl overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="bg-paper border-b border-line">
              <tr className="text-left font-display text-xs uppercase tracking-wide text-charcoal/60">
                <th className="px-5 py-3 whitespace-nowrap">Name</th>
                <th className="px-5 py-3 whitespace-nowrap">Category</th>
                <th className="px-5 py-3 whitespace-nowrap">Photos</th>
                <th className="px-5 py-3 whitespace-nowrap">Featured</th>
                <th className="px-5 py-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-4 font-display font-medium text-charcoal whitespace-nowrap">
                    {service.name}
                  </td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap capitalize">
                    {service.category?.replace(/-/g, ' ')}
                  </td>
                  <td className="px-5 py-4 text-charcoal/70 whitespace-nowrap">
                    {service.photos?.length || 0}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {service.featured ? (
                      <span className="text-xs font-display uppercase text-moss">Yes</span>
                    ) : (
                      <span className="text-xs font-display uppercase text-charcoal/40">No</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right space-x-3 whitespace-nowrap">
                    <Link
                      to={`/admin/services/${service._id}/edit`}
                      className="font-display text-xs uppercase tracking-wide text-moss hover:text-brass"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id, service.name)}
                      disabled={deletingId === service._id}
                      className="font-display text-xs uppercase tracking-wide text-red-700 hover:text-red-900 disabled:opacity-40"
                    >
                      {deletingId === service._id ? 'Deleting…' : 'Delete'}
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

export default AdminServices