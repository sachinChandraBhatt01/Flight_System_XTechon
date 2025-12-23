import React from 'react'
import { BrowserRouter , Route, Routes } from "react-router-dom"

import Login from "./pages/Auth/Login"
import Wallet from "./pages/wallet/Wallet"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Register from './pages/Auth/Register'
import FlightSearch from './pages/FlightBook/FlightSearch'
import BookingHwistory from './pages/Booking/BookingHistory'

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<ProtectedRoutes><FlightSearch /></ProtectedRoutes>} />
        <Route path='/wallet' element={<ProtectedRoutes><Wallet /></ProtectedRoutes>} />
        <Route path='/bookings' element={<ProtectedRoutes><BookingHwistory /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter >
  )
}

export default App