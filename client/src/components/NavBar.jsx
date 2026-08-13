import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="AFEL Tours" className="h-11 w-11" />
          <span className="font-display font-bold text-xl tracking-tight text-charcoal">
            AFEL TOURS KENYA
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-display text-sm font-medium">
          <Link to="/hotels" className="text-charcoal hover:text-moss transition-colors">
            Hotels
          </Link>

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
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}

export default Navbar