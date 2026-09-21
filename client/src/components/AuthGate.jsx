import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'

function AuthGate({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <div className="relative min-h-screen w-full overflow-hidden bg-charcoal">
          <img
            src="https://images.unsplash.com/photo-1519659528534-7fd733a832a0?fm=jpg&q=80&w=2000&auto=format&fit=crop"
            alt="Hot air balloon over a herd of zebras, Maasai Mara"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

          <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-5 py-5 sm:px-10 sm:py-8">
            <div className="bg-white/95 rounded-full p-1.5 sm:p-2">
              <img src="/logo.png" alt="" className="h-7 w-7 sm:h-9 sm:w-9 block" />
            </div>
            <span className="font-display font-semibold text-white text-base sm:text-lg tracking-tight">
              AFEL Tours
            </span>
          </div>

          <div className="relative min-h-screen flex flex-col justify-end items-start sm:items-center px-5 sm:px-10 pb-14 sm:pb-24 text-left sm:text-center">
            <h1 className="font-display font-semibold text-white text-[2.25rem] sm:text-6xl leading-[1.05] tracking-tight mb-6 max-w-2xl">
              Explore the beauty of Kenya with our
            <br />
              curated tour safaris and experiences.
  </h1>
  <p className="font-body text-white/80 text-base sm:text-lg mb-9 max-w-md">
    Hotels, safaris, and journeys across Kenya — sign in to start planning yours.
  </p>

  <SignInButton mode="modal">
    <button className="bg-brass text-white font-display font-medium text-base px-7 py-3.5 rounded-full hover:bg-moss transition-colors">
      Sign in
    </button>
  </SignInButton>
</div>
        </div>
      </SignedOut>
    </>
  )
}

export default AuthGate