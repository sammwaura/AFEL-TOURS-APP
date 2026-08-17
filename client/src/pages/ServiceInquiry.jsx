import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser, SignInButton } from '@clerk/clerk-react'
import { getServiceBySlug } from '../api/services'
import { createServiceInquiry } from '../api/serviceInquiries'


function ServiceInquiry() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isSignedIn, user } = useUser()

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [groupSize, setGroupSize] = useState(1)
  const [destination, setDestination] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [notes, setNotes] = useState('')
  const [phone, setPhone] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [formError, setFormError] = useState('')


  useEffect(() => {
    getServiceBySlug(slug)
        .then(setService)
        .catch((err) => console.error('Failed to load service:', err))
        .finally(() => setLoading(false))
  }, [slug])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!startDate || !endDate){
        setFormError('Please select your preferred start and end dates.')
        return
    }
    if (new Date(startDate) >= new Date(endDate)) {
        setFormError('End date must be after start date.')
        return
    }


    setSubmitting(true)
    setResult(null)
    try {
        await createServiceInquiry({
            service: service._id,
            userId: user.id,
            userEmail: user.primaryEmailAddress?.emailAddress,
            userPhone: phone,
            preferredStartDate: startDate,
            preferredEndDdate: endDate,
            groupSize,
            destination,
            budgetRange,
            notes,
        })
        setResult('success')
    } catch (err) {
        console.error('Service Inquiry failed:', err)
        setResult('error')
    } finally {
        setSubmitting(false)
    }
  }


  if (loading) {
    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <p className="font-display text-sm text-charcoal/60">Loading...</p>
        </div>
    )
  }

  if (!service) {
    return(
        <div className="max-w-2xl mx-auto px-6 py-16">
            <p className="font-display text-xl text-charcoal">Service Not Found...</p>
        </div>
    )
  }

  if (result === 'success') {
    return (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-brass mb-3">
                Request Received
            </p>
            <h1 className='font-display font-bold text-3xl text-charcoal mb-4'>
                Your Inquiry Has been submitted
            </h1>
            <p className='text-charcoal/70 mb-8 max-w-md mx-auto'>
                    Our Team will review your request for {service.name} and reach out shortly to finalize the details
            </p>
            <button onClick={() => navigate('/')} 
                    className='bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-8 py-3 rounded-full hover:bg-moss transition-colors'>
                        Back to Home
            </button>
        </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
        <p className='font-display text-xs font-semibold uppercase tracking-widest text-brass mb-2'>
            Request To book
        </p>
        <h1 className='font-display font-bold text-3xl text-charcoal mb-8'>{service.name}</h1>

        <form onSubmit={handleSubmit} className='border-2 border-brass rounded-xl p-6' >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Preferred Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      className='w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass' />
                </div>
                <div>
                    <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Preferred End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                        className='w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass'/>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Group Size</label>
                    <input type="number" min="1" value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))}
                            className='"w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass'/>
                </div>
           
                <div>
                <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='07XX XXX XXX'
                        className='w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass'/>
                </div>
             </div>

             <div className="mb-4">
                <label className="block font-display text-xs uppercase tracking-wide text-moss mb-1">Tell us more</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder='Any specific - Occassion, Group Travel, Special requests...'
                            className='"w-full border border-line rounded-lg px-3 py-2 font-display text-sm outline-none focus:border-brass resize-none' >
                </textarea>
             </div>

             {formError && (
                <p className='font-display text-xs text-red-700 mb-4'>{formError}</p>
             )}

             {!isSignedIn ? (
                <SignInButton mode='modal'>
                    <button type='submit' className='w-full bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide py-3 rounded-full hover:bg-moss transition-colors'>
                                    Sign In to Submit Request
                    </button>
                </SignInButton>
             ) : (
                <button type='submit' disabled={submitting} 
                        className='w-full bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide py-3 rounded-full hover:bg-moss transition-colors disabled:opacity-40'>
                            {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
             )}

             {result === 'error' && (
                <p className='font-display text-xs text-red-700 mt-3'>Something went wrong submitting your request. Please try again.</p>
             )}
        </form>
    </div>
  )
}

export default ServiceInquiry

