import {Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import AuthGate from './components/AuthGate'
import AdminGate from './components/AdminGate'
import AdminLayout from './components/AdminLayout'
import Home from './components/Home'
import HotelListing from './pages/HotelListing'
import HotelDetails from './pages/HotelDetails'
import Inquiry from './pages/Inquiry'
import MyInquiries from './pages/MyInquiries'
import ServiceDetails from './pages/ServiceDetails'
import ServiceInquiry from './pages/ServiceInquiry'
import AdminOverview from './pages/admin/AdminOverview'
import AdminHotels from './pages/admin/AdminHotels'
import AdminHotelForm from './pages/admin/AdminHotelForm'
import AdminRoomTypes from './pages/admin/AdminRoomTypes'
import AdminRoomForm from './pages/admin/AdminRoomForm'
import AdminServices from './pages/admin/AdminServices'
import AdminServiceForm from './pages/admin/AdminServiceForm'


function App() {
  return (
    <AuthGate>
      <Routes>
        {/* Admiin Routes - own layout, no public Navbar/Footer */}
        <Route path='/admin/*' element={
          <AdminGate>
            <AdminLayout />
          </AdminGate>
        }
      >
        <Route index element = {<AdminOverview />}/>
        <Route path='hotels' element = {<AdminHotels />} />
        <Route path='hotels/new' element = {<AdminHotelForm />} />
        <Route path='hotels/:id/edit' element = {<AdminHotelForm />} />
        <Route path="hotels/:hotelId/rooms" element={<AdminRoomTypes />} />
        <Route path="hotels/:hotelId/rooms/new" element={<AdminRoomForm />} />
        <Route path="hotels/:hotelId/rooms/:roomId/edit" element={<AdminRoomForm />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="services/new" element={<AdminServiceForm />} />
        <Route path="services/:id/edit" element={<AdminServiceForm />} />
        </Route>

        {/* Public site routes - wrapped with Navbar/Footer */}
        <Route path='*' element={
           <div className="min-h-screen bg-paper">
        <Navbar />
        <div className='flex-1'>
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
       <Footer/>
      </div>
        }
        />
      </Routes>
    </AuthGate>
  )
}

export default App