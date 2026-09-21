import { useEffect, useState, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { getAllServices } from '../api/services'

function Navbar() {
  const { user } = useUser()
  const [services, setServices] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
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

  //close mobile menu whenever the viewport is resized back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
        setMobileServicesOpen(false)
  }
}

window.addEventListener('resize', handleResize)
return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    setMobileSerivesOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
      <Link to="/" onClick={closeMobile} className="flex items-center min-w-0">
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-charcoal truncate">
            AFEL Tours
          </span>
      </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-display text-sm font-medium">
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

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle mobile menu" className="w-9 h-9 flex items-center justify-center text-charcoal">
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
       {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-white">
          <nav className="flex flex-col font-display text-sm">
            <button
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className="flex items-center justify-between px-4 py-3 border-b border-line text-charcoal font-medium"
            >
              What We Offer
              <svg
                className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div className="bg-paper">
                <Link
                  to="/hotels"
                  onClick={closeMobile}
                  className="block px-6 py-3 border-b border-line text-charcoal"
                >
                  Hotel Bookings
                </Link>
                {services.map((service) => (
                  <Link
                    key={service._id}
                    to={`/services/${service.slug}`}
                    onClick={closeMobile}
                    className="block px-6 py-3 border-b border-line text-charcoal"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
             <SignedIn>
              <Link
                to="/my-bookings"
                onClick={closeMobile}
                className="px-4 py-3 border-b border-line text-charcoal font-medium"
              >
                My Bookings
              </Link>
              {user?.publicMetadata?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={closeMobile}
                  className="px-4 py-3 border-b border-line text-charcoal font-medium"
                >
                  Admin
                </Link>
              )}
            </SignedIn>
              <SignedOut>
              <div className="px-4 py-4">
                <SignInButton mode="modal">
                  <button
                    onClick={closeMobile}
                    className="w-full bg-brass text-white font-semibold py-2.5 rounded-full hover:bg-moss transition-colors"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar