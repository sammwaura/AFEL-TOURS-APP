import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleHotel, createHotel, updateHotel } from "../../api/hotels";


function AdminHotelForm() {
    const { id } = useParams()
    const isEditing = Boolean(id)
    const navigate = useNavigate()


    const [form,setForm] = useState({
        name: '',
        owner: '',
        city: '',
        address: '',
        description: '',
        amenities: '',
        photos: '',
    })
    const [loading, setLoading ] = useState(isEditing)
    const [saving, setSaving ] = useState(false)
    const [error, setError ] = useState('')


    useEffect(() => {
        if (!isEditing) return
        getSingleHotel(id)
            .then((hotel) => {
                setForm({
                    name: hotel.name || '',
                    owner: hotel.owner || '',
                    city: hotel.city || '',
                    address: hotel.address || '',
                    description: hotel.description || '',
                    amenities: (hotel.amenities || []).join(', '),
                    photos: (hotel.photos || []).join(', '),
                })
            })
            .catch((err) => console.error('Failed to load hotel:', err))
            .finally(() => setLoading(false))
    }, [id, isEditing])


    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value}))
    }

    const handleSubmiit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)

        const payload = {
            name: form.name,
            owner: form.owner,
            city: form.city,
            address: form.address,
            description: form.description,
            amenities: form.amenities
                .split(',')
                .map((a) => a.trim())
                .filter(Boolean),
            photos: form.photos
                .split(',')
                .map((p) => p.trim())
                .filter(Boolean),
        }

        try {
            if (isEditing) {
                await updateHotel(id, payload)
            } else {
                await createHotel(payload)
            }
            navigate('/admin/hotels')
        } catch (err){
            console.error('Failed to save hotel:', err)
            setError('Failed to save hotel. Please check the fields and try again.')
        } finally {
            setSaving(false)
        }
    }

    if (loading){
        return <p className="font-display text-sm text-charcoal/60">Loading...</p>
    }

    return (
        <div className="max-w-2xl">
            <h1 className="font-display font-bold text-3xl text-charcoal mb-8">
                {isEditing ? 'Edit Hotel' : 'Add Hotel'}
            </h1>

            <form onSubmit={handleSubmiit} className="bg-white border border-line rounded-xl p-6 space-y-4">
                <div>
                    <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
                        Hotel Name
                    </label>
                    <input type="text" value={form.name} onChange={handleChange('name')} required
                            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass" />
                </div>

                <div>
                    <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">
                        Owner ID (your ClerkUser ID)
                    </label>
                    <input type="text" value={form.owner} onChange={handleChange('owner')} required
                            className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">City</label>
                        <input type="text" value={form.city} onChange={handleChange('city')} required
                               className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"/>
                    </div>
                    <div>
                        <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Address</label>
                        <input type="text" value={form.address} onChange={handleChange('address')} required 
                                className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"/>
                    </div>
             </div>

             <div>
                <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Description</label>
                <textarea value={form.description} onChange={handleChange('description')} required
                            rows={4} className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass resize-none"></textarea>
             </div>

             <div>
                <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Amenities (comma-separated)</label>
                <input type="text" value={form.amenities} onChange={handleChange('amenities')} placeholder="Free Wifi, Beach Front, Full Board, SPA & Indoor Games" 
                       className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass"/>
             </div>

             <div>
                <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Photo URLs (comma-separated)</label>
                <textarea value={form.photos} onChange={handleChange('photos')} rows={2} placeholder="http://localhost:8000/uploads/photo1.jpg, http://localhost:8000/uploads/photo2.jpg"
                          className="w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass resize-none">
                </textarea>
                <p className="text-xs text-charcoal/50 mt-1">Photo Upload UI is coming later step - for now, paste URLs from postman uploads</p>
             </div>

             {error && <p className="font-display text-xs text-red-700">{error}</p>}

             <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="bg-brass text-white font-display text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-moss transition-colors disabled:opacity-40">
                    {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Hotel'}
                </button>
                <button type="button" onClick={() => navigate('/admin/hotels')}
                       className="font-display text-sm text-charcoal/60 hover:text-charcoal px-6 py-2.5">Cancel</button>
             </div>
            </form>
        </div>
    )
}

export default AdminHotelForm
