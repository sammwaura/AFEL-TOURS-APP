import { Link } from 'react-router-dom'

function Footer(){
    return (
        <footer className='bg-charcoal text-paper/90'>
            <div className='max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10'>
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/logo.png" alt="AFEL Tours" className='h-10 w-10' />
                        <span className='font-display font-bold text-lg text-paper'>AFEL Tours</span>
                    </div>
                    <p className="text-sm text-paper/60 leading-relaxed">
                                African Forests Escapade Limited — converging nature &amp; leisure,
                                bush to beach
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className='font-display text-xs font-semibold uppercase tracking-widest text-brass mb-4'>Quick Links</h4>
                    <ul className='space-y-2 text-sm'>
                        <li>
                            <Link to="/" className='text-paper/70 hover:text-brass transition-colors'>
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/hotels" className='text-paper/70 hover:text-brass transition-colors'>
                                    Hotel Bookings
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-bookings" className='text-paper/70 hover:text-brass transition-colors'>
                                    My Bookings
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className='font-display text-xs font-semibold uppercase tracking-widest text-brass mb-4'>
                        Get In Touch
                    </h4>
                    <ul className='space-y-2 text-sm text-paper/70'>
                        <li>📞 +254 740 116 783</li>
                        <li> ✉️  info@africanforetsescapade.com</li>
                        <li>📍 Nairobi, Kenya</li>
                    </ul>

                    <div className='flex gap-4 mt-5'>
                        <a href="#"
                            className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center hover:border-brass hover:text-brass transition-colors"
                            aria-label="Instagram">
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'></path>
                            </svg>
                        </a> 
                          <a href="#"
                            className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center hover:border-brass hover:text-brass transition-colors"
                            aria-label="Facebook">
                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.549 4.16 1.595 5.985L0 24l6.223-1.632a11.9 11.9 0 005.822 1.484h.005c6.583 0 11.941-5.363 11.943-11.943 0-3.19-1.24-6.19-3.473-8.46" />
                                </svg>
                            </a>
                    </div>
                </div>
            </div>
            <div className='border-t border-paper/10 py-5'>
                <p className='text-center text-xs text-paper/50'>
                      © {new Date().getFullYear()} African Forests Escapade Limited. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer

