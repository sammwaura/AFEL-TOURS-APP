import {Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Home from './components/Home'
import HotelListing from './pages/HotelListing'
import HotelDetails from './pages/HotelDetails'
import Inquiry from './pages/Inquiry'


function App() {
  
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<HotelListing />} />
        <Route path='/hotels/:id' element={<HotelDetails />} />
        <Route path='/inquire/:roomId' element={<Inquiry />} />
  
      </Routes>
    </div>
  )
}

export default App