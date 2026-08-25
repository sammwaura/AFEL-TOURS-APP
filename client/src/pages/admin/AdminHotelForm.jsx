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

        <div></div>
    )



    


}

export default AdminHotelForm
