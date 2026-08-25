import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

function AdminGate({ children }) {
    const { isLoaded, isSignedIn, user } = useUser()


    if (!isLoaded) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-paper'>
                <p className='font-display text-sm text-charcoal/60'>Loading...</p>
            </div>
        )
    }


    const isAdmin = isSignedIn && user?.publicMetadata?.role === 'admin'

    if (!isAdmin){
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center'>
                <h1 className='font-display font-bold text-2xl text-charcoal mb-3'>Admin Access Only</h1>
                <p className='text-charcoal/70 mb-6 max-w-sm'> You don't have permission to view this page</p>
                <Link to='/' className='bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-full hover:bg-moss transition-colors'>
                    Back To Home
                </Link>
            </div>
        )
    }

    return children
}

export default AdminGate