import {  SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'


function AuthGate ({ children }) {
    return (
        <>
        <SignedIn>        
            {children} 
        </SignedIn>

        <SignedOut>
            <div className="min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center">
                <img src="/logo.png" alt="AFEL Tours" className='h-24 w-24 mb-6' />
                <h1 className="font-display font-bold text-3xl text-charcoal mb-3">
                    Welcome To AFEL TOURS KENYA
                </h1>
                <p className='text-charcoal/70 max-w-md mb-8'>
                Converging Nature &amp; leisure - Sign In to explore our hotels, safaris and curated experiences</p>
                <SignInButton mode="modal">
                    <button className='bg-brass text-white font-display text-sm font-semibold uppercase tracking-wide px-8 py-3.5 rounded-full hover:bg-moss transition-colors'>
                        Sign In to Continue
                    </button>
                </SignInButton>
            </div>
        </SignedOut>
        </>
    )
}

export default AuthGate