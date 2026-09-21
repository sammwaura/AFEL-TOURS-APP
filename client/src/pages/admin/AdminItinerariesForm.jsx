import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleItinerary, createItinerary, updateItinerary } from '../../api/itineraries'
import { getAllHotels } from '../../api/hotels'
import PhotoUploader from '../../components/PhotoUploader'

function AdminItineraryForm() {
  const { serviceId, id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [hotels, setHotels] = useState([])

  const [form, setForm] = useState({
    service: '',
    name: '',
    park: '',
    nights: '',
    days: '',
    maxGroupSize: '',
    description: '',
    price: '',
    nearestHotel: '',
    highlights: '',
    photos: [],
    featured: false,
  })
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllHotels().then(setHotels).catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (!isEditing) return
    getSingleItinerary(id)
      .then((itinerary) => {
        setForm({
          service: itinerary.service?._id || itinerary.service || '',
          name: itinerary.name || '',
          park: itinerary.park || '',
          nights: itinerary.nights || '',
          days: itinerary.days || '',
          maxGroupSize: itinerary.maxGroupSize || '',
          description: itinerary.description || '',
          price: itinerary.price || '',
          nearestHotel: itinerary.nearestHotel?._id || '',
          highlights: (itinerary.highlights || []).join(', '),
          photos: itinerary.photos || [],
          featured: itinerary.featured || false,
        })
      })
      .catch((err) => console.error('Failed to load itinerary:', err))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      service: serviceId,
      name: form.name,
      park: form.park,
      nights: Number(form.nights),
      days: Number(form.days),
      maxGroupSize: Number(form.maxGroupSize),
      description: form.description,
      price: Number(form.price),
      nearestHotel: form.nearestHotel || undefined,
      highlights: form.highlights
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
      photos: form.photos,
      featured: form.featured,
    }

    try {
      if (isEditing) {
        await updateItinerary(id, payload)
      } else {
        await createItinerary(payload)
      }
      navigate(`/admin/services/${serviceId}/itineraries`)
    } catch (err) {
      console.error('Failed to save itinerary:', err)
      setError('Failed to save itinerary. Please check the fields and try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="font-display text-sm text-charcoal/60">Loading…</p>
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display font-bold text-3xl text-charcoal mb-8">
        {isEditing ? 'Edit Itinerary' : 'Add Itinerary'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-xl p-6 space-y-4">
       <p className="font-display text-xs uppercase tracking-wide text-moss mb-1">
                Adding itinerary under this service
       </p>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Itinerary Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="e.g. 3-Day Maasai Mara Explorer"
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            National Park / Reserve
          </label>
          <input
            type="text"
            value={form.park}
            onChange={handleChange('park')}
            placeholder="e.g. Maasai Mara National Reserve"
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
              Nights
            </label>
            <input
              type="number"
              min="0"
              value={form.nights}
              onChange={handleChange('nights')}
              required
              className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
            />
          </div>
          <div>
            <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
              Days
            </label>
            <input
              type="number"
              min="1"
              value={form.days}
              onChange={handleChange('days')}
              required
              className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
            />
          </div>
          <div>
            <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
              Max Group
            </label>
            <input
              type="number"
              min="1"
              value={form.maxGroupSize}
              onChange={handleChange('maxGroupSize')}
              required
              className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
            />
          </div>
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Brief Description
          </label>
          <textarea
            value={form.description}
            onChange={handleChange('description')}
            required
            rows={4}
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass resize-none"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Price (KES)
          </label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange('price')}
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Nearest Hotel / Lodge
          </label>
          <select
            value={form.nearestHotel}
            onChange={handleChange('nearestHotel')}
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass bg-white"
          >
            <option value="">None selected</option>
            {hotels.map((h) => (
              <option key={h._id} value={h._id}>{h.name} — {h.city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Highlights (comma-separated)
          </label>
          <input
            type="text"
            value={form.highlights}
            onChange={handleChange('highlights')}
            placeholder="Game drives, Big Five sightings, Sundowner"
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <PhotoUploader
          photos={form.photos}
          onChange={(newPhotos) => setForm((prev) => ({ ...prev, photos: newPhotos }))}
        />

        <label className="flex items-center gap-2 font-display text-sm text-charcoal">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={handleChange('featured')}
            className="accent-brass"
          />
          Feature this itinerary
        </label>

        {error && <p className="font-display text-xs text-red-700">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-brass text-white font-display text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-moss transition-colors disabled:opacity-40"
          >
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Itinerary'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/itineraries')}
            className="font-display text-sm text-charcoal/60 hover:text-charcoal px-6 py-2.5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminItineraryForm