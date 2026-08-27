import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSingleRoom, createRoom, updateRoom } from '../../api/rooms'

function AdminRoomForm() {
  const { hotelId, roomId } = useParams()
  const isEditing = Boolean(roomId)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    roomType: '',
    pricePerNight: '',
    maxGuests: '',
    amenities: '',
    photos: '',
    featured: false,
  })
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return
    getSingleRoom(roomId)
      .then((room) => {
        setForm({
          roomType: room.roomType || '',
          pricePerNight: room.pricePerNight || '',
          maxGuests: room.maxGuests || '',
          amenities: (room.amenities || []).join(', '),
          photos: (room.photos || []).join(', '),
          featured: room.featured || false,
        })
      })
      .catch((err) => console.error('Failed to load room:', err))
      .finally(() => setLoading(false))
  }, [roomId, isEditing])

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      hotel: hotelId,
      roomType: form.roomType,
      pricePerNight: Number(form.pricePerNight),
      maxGuests: Number(form.maxGuests),
      amenities: form.amenities
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      photos: form.photos
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
      featured: form.featured,
    }

    try {
      if (isEditing) {
        await updateRoom(roomId, payload)
      } else {
        await createRoom(payload)
      }
      navigate(`/admin/hotels/${hotelId}/rooms`)
    } catch (err) {
      console.error('Failed to save room:', err)
      setError('Failed to save room type. Please check the fields and try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="font-display text-sm text-charcoal/60">Loading…</p>
  }

  return (
    <div className="max-w-2xl">
      <Link
        to={`/admin/hotels/${hotelId}/rooms`}
        className="font-display text-xs uppercase tracking-wide text-charcoal/50 hover:text-charcoal mb-4 inline-block"
      >
        ← Back to Room Types
      </Link>

      <h1 className="font-display font-bold text-3xl text-charcoal mb-8">
        {isEditing ? 'Edit Room Type' : 'Add Room Type'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-xl p-6 space-y-4">
        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Room Type Name
          </label>
          <input
            type="text"
            value={form.roomType}
            onChange={handleChange('roomType')}
            placeholder="e.g. Garden View, Pool View, Deluxe"
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
              Price per Night (KES)
            </label>
            <input
              type="number"
              min="0"
              value={form.pricePerNight}
              onChange={handleChange('pricePerNight')}
              required
              className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
            />
          </div>
          <div>
            <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
              Max Guests
            </label>
            <input
              type="number"
              min="1"
              value={form.maxGuests}
              onChange={handleChange('maxGuests')}
              required
              className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
            />
          </div>
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Amenities (comma-separated)
          </label>
          <input
            type="text"
            value={form.amenities}
            onChange={handleChange('amenities')}
            placeholder="WiFi, AC, TV, Balcony"
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Photo URLs (comma-separated)
          </label>
          <textarea
            value={form.photos}
            onChange={handleChange('photos')}
            rows={2}
            placeholder="http://localhost:8000/uploads/photo1.jpg"
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass resize-none"
          />
        </div>

        <label className="flex items-center gap-2 font-display text-sm text-charcoal">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={handleChange('featured')}
            className="accent-brass"
          />
          Mark as featured
        </label>

        {error && <p className="font-display text-xs text-red-700">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-brass text-white font-display text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-moss transition-colors disabled:opacity-40"
          >
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Room Type'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/admin/hotels/${hotelId}/rooms`)}
            className="font-display text-sm text-charcoal/60 hover:text-charcoal px-6 py-2.5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminRoomForm