import {Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Home from './components/Home'
import RoomListing from './pages/RoomListing'
import RoomDetails from './pages/RoomDetails'


function App() {
  
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<RoomListing />} />
        <Route path='/rooms/:id' element={<RoomDetails />} />
      </Routes>
    </div>
  )
}

export default App