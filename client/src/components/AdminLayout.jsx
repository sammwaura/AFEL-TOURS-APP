import { NavLink, Outlet } from "react-router-dom"

const navItems = [
    { to: '/admin', label: 'Overview', end: true },
    { to: '/admin/hotels', label: 'Hotels' },
    { to: '/admin/services', label: 'Services' },
    { to: '/admin/bookings', label: 'Hotel Bookings' },
    { to: '/admin/inquiries', label: 'Service Inquiries' },
]

function AdminLayout(){
    return (
        <div className="min-h-screen bg-paper flex">
            <aside className="w-64 shrink-0 bg-charcoal text-paper min-h-screen">
                <div className="p-6 border-b border-paper/10">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="AFEL Tours" className="h-9 w-9" />
                        <span className="font-display font-bold text-lg">Admin</span>
                    </div>
                </div>

                <nav className="p-4 space-y-1">{navItems.map((item) => (
                    <NavLink key={item.to} to={item.to} end={item.end} 
                     className={({ isActive }) => `block px-4 py-2.5 rounded-lg font-display text-sm transition-colors
                                 $ {isActive ? 'bg-brass text-white' : 'text-paper/70 hover:text-paper }`
                                }>
                                    {item.label}
                    </NavLink>
                  ))}
                </nav>


                <div className="p-4 border-t border-paper/10 mt-4">
                  <NavLink to='/' className='block px-4 py-2.5 font-display text-sm text-paper/50 hover:text-paper transition-colors'>
                        ← Back to Site
                  </NavLink>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}


export default AdminLayout