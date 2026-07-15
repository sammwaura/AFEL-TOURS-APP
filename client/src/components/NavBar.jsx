import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function NavBar() {
    return (
        <header className='bg-ink text-paper'>
            <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
                <Link to="/" className='font-display text-2xl tracking-tight'>
                Ledger & Key
                </Link>

                <nav className='flex items-center gap-6 font-mono teext-sm uppercase tracking-wide'>
                    <Link to="/rooms" className='hover:text-brass transition-colors'>
                    Rooms
                    </Link>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className='border border-brass text-brass px-3 py-1.5 hover:bg-brass hover:text-ink transition-colors'>
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Link to="/my-bookings" className='hover:text-brass transition-colors'>
                        My Bookings
                        </Link>
                    </SignedIn>
                </nav>
            </div>
        </header>
    )
}

export default NavBar