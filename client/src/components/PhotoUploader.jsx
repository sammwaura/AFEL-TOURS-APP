import { useRef, useState } from 'react'
import { uploadPhotos } from '../api/upload'

function PhotoUploader({ photos, onChange }) {
    const fileInputRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files)
        if( files.length === 0 ) return

        setError('')
        setUploading(true)
        try {
            const newUrls = await uploadPhotos(files)
            onChange([...photos, ...newUrls])
        } catch (err){
            console.error('Upload Failed:', err)
            setError('Upload failed. Please try again - max 5 files at once, images only.')
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleRemove = (urlToRemove) => {
        onChange(photos.filter((url) => url !== urlToRemove))
    }

    return (
            <div>
        <label className="block font-display text-xs uppercase tracking-wide text-moss mb-2">
            Photos
        </label>

        {photos.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
            {photos.map((url) => (
                <div key={url} className="relative aspect-square rounded-lg overflow-hidden bg-line group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                    type="button"
                    onClick={() => handleRemove(url)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-charcoal/80 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove photo"
                >
                    ✕
                </button>
                </div>
            ))}
            </div>
        )}
        <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="border-2 border-dashed border-line rounded-lg px-4 py-3 w-full text-center font-display text-sm text-charcoal/60 hover:border-brass hover:text-brass transition-colors disabled:opacity-50"
        >
            {uploading ? 'Uploading…' : '+ Upload Photos (up to 5 at a time)'}
            </button>

        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
        />

        {error && <p className="font-display text-xs text-red-700 mt-2">{error}</p>}
        </div>
    )

}

export default PhotoUploader