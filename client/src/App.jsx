
  import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
  } from '@clerk/clerk-react'
  import { useUser } from '@clerk/clerk-react'


function App() {
  const { user } = useUser()
  console.log('Clerk userId:', user?.id)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <h1 className="text-4xl font-bold text-slate-800">Welcome to Afel Tours App</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <button className='px-4 py-2 bg-slate-800 text-white rounded-lg'>
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default App