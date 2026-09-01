import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getServiceById, createService, updateService } from '../../api/services'
import PhotoUploader from '../../components/PhotoUploader'

const categoryOptions = [
  { value: 'safari', label: 'Safari' },
  { value: 'hiking-camping', label: 'Hiking & Camping' },
  { value: 'conference', label: 'Conference' },
  { value: 'social-group', label: 'Social Group' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family' },
]

function AdminServiceForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: 'safari',
    shortDescription: '',
    description: '',
    highlights: '',
    photos: [],
    startingPrice: '',
    featured: false,
  })
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return
    getServiceById(id)
      .then((service) => {
        if (!service) return
        setForm({
          name: service.name || '',
          slug: service.slug || '',
          category: service.category || 'safari',
          shortDescription: service.shortDescription || '',
          description: service.description || '',
          highlights: (service.highlights || []).join(', '),
          photos: service.photos || [],
          startingPrice: service.startingPrice || '',
          featured: service.featured || false,
        })
      })
      .catch((err) => console.error('Failed to load service:', err))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const handleNameChange = (e) => {
    const name = e.target.value
    setForm((prev) => ({
      ...prev,
      name,
      slug: isEditing ? prev.slug : generateSlug(name),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      shortDescription: form.shortDescription,
      description: form.description,
      highlights: form.highlights
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
      photos: form.photos,
      startingPrice: form.startingPrice ? Number(form.startingPrice) : undefined,
      featured: form.featured,
    }

    try {
      if (isEditing) {
        await updateService(id, payload)
      } else {
        await createService(payload)
      }
      navigate('/admin/services')
    } catch (err) {
      console.error('Failed to save service:', err)
      setError('Failed to save service. Please check the fields and try again.')
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
        {isEditing ? 'Edit Service' : 'Add Service'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-xl p-6 space-y-4">
        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Service Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleNameChange}
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Slug (used in URL)
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={handleChange('slug')}
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={handleChange('category')}
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass bg-white"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Short Description (for cards)
          </label>
          <input
            type="text"
            value={form.shortDescription}
            onChange={handleChange('shortDescription')}
            required
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Full Description
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
            Highlights (comma-separated)
          </label>
          <input
            type="text"
            value={form.highlights}
            onChange={handleChange('highlights')}
            placeholder="Professional guides, Meals included, Transport arranged"
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <PhotoUploader photos={form.photos} onChange={(newPhotos) => setForm((prev) => ({...prev, photos: newPhotos }))} />

       

        <div>
          <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
            Starting Price (KES, optional)
          </label>
          <input
            type="number"
            min="0"
            value={form.startingPrice}
            onChange={handleChange('startingPrice')}
            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"
          />
        </div>

        <label className="flex items-center gap-2 font-display text-sm text-charcoal">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={handleChange('featured')}
            className="accent-brass"
          />
          Show on homepage
        </label>

        {error && <p className="font-display text-xs text-red-700">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-brass text-white font-display text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-moss transition-colors disabled:opacity-40"
          >
            {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Service'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="font-display text-sm text-charcoal/60 hover:text-charcoal px-6 py-2.5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminServiceForm