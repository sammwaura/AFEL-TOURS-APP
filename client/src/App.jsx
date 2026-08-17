import {Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import AuthGate from './components/AuthGate'
import Home from './components/Home'
import HotelListing from './pages/HotelListing'
import HotelDetails from './pages/HotelDetails'
import Inquiry from './pages/Inquiry'
import MyInquiries from './pages/MyInquiries'
import ServiceDetails from './pages/ServiceDetails'
import ServiceCard from './components/ServiceCard'
import ServiceInquiry from './pages/ServiceInquiry'


function App() {
  
  return (
    <AuthGate>
      <div className="min-h-screen bg-paper">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<HotelListing />} />
          <Route path='/hotels/:id' element={<HotelDetails />} />
          <Route path='/inquire/:roomId' element={<Inquiry />} />
          <Route path='/my-bookings' element={<MyInquiries />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path='/services/:slug/inquire' element={<ServiceInquiry />}/>
        </Routes>
      </div>
    </AuthGate>
  )
}

export default App