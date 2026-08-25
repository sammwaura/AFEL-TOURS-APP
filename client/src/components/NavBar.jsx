import { useEffect, useState, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { getAllServices } from '../api/services'

function Navbar() {
  const { user } = useUser()
  const [services, setServices] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    getAllServices()
      .then(setServices)
      .catch((err) => console.error('Failed to load services for nav:', err))
  }, [])

  useEffect(()=> {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="AFEL Tours" className="h-11 w-11" />
          <span className="font-display font-bold text-2xl tracking-tight text-charcoal">
            AFEL TOURS KENYA
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-display text-xl font-medium">
          <div className='relative' ref={menuRef}>
            <button onClick={() => setMenuOpen((prev) => !prev)}
              className='text-charcoal hover:text-moss transition-colors flex items-center gap-1'>
                    What We Offer
                    <svg className={`w-3.5 h-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                          fill='none' stroke='currentColor' viewBox='0 0 24 24'  
                    >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 91-7 7-7-7'></path>
                    </svg>
            </button>

            {menuOpen && (
              <div className='absolute top-full right-0 mt-3 w-72 bg-white border border-line rounded-xl shadow-lg overflow-hidden'>
                <Link to="/hotels" onClick={() => setMenuOpen(false)}
                  className='block px-5 py-3 hover:bg-paper transition-colors border-b border-line'>
                    <span className='font-semibold text-charcoal'>Hotel Bookings</span>
                    <p className='text-xs text-charcoal/60 mt-0.5'>Reservations with our contracted hotels</p>
                  </Link>

                  {services.map((service) => (
                    <Link key={service._id} to={`/services/${service.slug}`} onClick={() => setMenuOpen(false)}
                          className='block px-5 py-3 hover:bg-paper transition-colors border-b border-line last:border-b-0'>
                            <span className='font-semibold text-charcoal'>{service.name}</span>
                            <p className='text-xs text-charcoal/60 mt-0.5 line-clamp-1'>{service.shortDescription}</p>
                          </Link>
                  ))}
              </div>
            )}
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-brass text-white px-4 py-2 rounded-full hover:bg-moss transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link to="/my-bookings" className="text-charcoal hover:text-moss transition-colors">
              My Bookings
            </Link>
            {user?.publicMetadata?.role === 'admin' && (
              <Link to='/admin' className='text-charcoal hover:text-moss transition-colors'>
                Admin
              </Link>
            )}
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}

export default Navbar